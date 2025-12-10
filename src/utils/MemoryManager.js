/**
 * MemoryManager.js
 * Core memory management logic - Paging, Segmentation, FIFO, LRU
 */

export class PageEntry {
  constructor(pageNo, frameNo = null) {
    this.pageNo = pageNo;
    this.frameNo = frameNo;
    this.resident = frameNo !== null;
    this.loadedAt = this.resident ? Date.now() : null;
    this.lastUsed = this.resident ? Date.now() : null;
  }
}

export class SegmentEntry {
  constructor(name, size, base, limit) {
    this.name = name;
    this.size = size;
    this.base = base;
    this.limit = limit;
  }
}

export class MemoryManager {
  constructor(memSize = 1024, frameSize = 64) {
    this.memSize = memSize;
    this.frameSize = frameSize;
    this.totalFrames = Math.max(1, Math.floor(memSize / frameSize));
    this.frames = Array(this.totalFrames).fill(null);
    this.freeFrames = new Set([...Array(this.totalFrames).keys()]);
    this.processes = new Map();
    this.pageFaults = [];
    this.fifoQueue = [];
    this.accessCounter = 0;
    this.lruTimestamps = new Map();
  }

  // Paging Allocation
  allocatePaging(processId, processSize) {
    const pagesNeeded = Math.ceil(processSize / this.frameSize);
    const pageTable = new Map();

    for (let p = 0; p < pagesNeeded; p++) {
      if (this.freeFrames.size > 0) {
        const frameNo = [...this.freeFrames][0];
        this.freeFrames.delete(frameNo);
        this.frames[frameNo] = { processId, pageNo: p };
        pageTable.set(p, new PageEntry(p, frameNo));
        this.fifoQueue.push({ processId, pageNo: p });
        this.accessCounter++;
        this.lruTimestamps.set(`${processId}-${p}`, this.accessCounter);
      } else {
        pageTable.set(p, new PageEntry(p, null));
      }
    }

    this.processes.set(processId, {
      type: 'paging',
      size: processSize,
      pages: pageTable
    });

    return pageTable;
  }

  // Access Page (triggers page faults)
  accessPage(processId, pageNo, algorithm = 'FIFO') {
    const proc = this.processes.get(processId);
    if (!proc || proc.type !== 'paging') {
      throw new Error('Process not found or not paging');
    }

    const pageTable = proc.pages;
    const entry = pageTable.get(pageNo);
    if (!entry) {
      throw new Error('Page number out of range');
    }

    if (entry.resident) {
      this.accessCounter++;
      this.lruTimestamps.set(`${processId}-${pageNo}`, this.accessCounter);
      entry.lastUsed = Date.now();
      return { fault: false };
    }

    // Page fault
    this.pageFaults.push(`PF: ${processId}-P${pageNo}`);

    if (this.freeFrames.size > 0) {
      const frameNo = [...this.freeFrames][0];
      this.freeFrames.delete(frameNo);
      this.frames[frameNo] = { processId, pageNo };
      entry.frameNo = frameNo;
      entry.resident = true;
      entry.loadedAt = Date.now();
      this.fifoQueue.push({ processId, pageNo });
      this.accessCounter++;
      this.lruTimestamps.set(`${processId}-${pageNo}`, this.accessCounter);
      return { fault: true, replacement: null };
    }

    // Need replacement
    if (algorithm.toUpperCase() === 'FIFO') {
      return this.fifoReplace(processId, pageNo);
    } else {
      return this.lruReplace(processId, pageNo);
    }
  }

  fifoReplace(processId, pageNo) {
    if (this.fifoQueue.length === 0) {
      throw new Error('FIFO queue empty');
    }

    const old = this.fifoQueue.shift();
    let oldFrame = null;

    for (let i = 0; i < this.frames.length; i++) {
      const f = this.frames[i];
      if (f && f.processId === old.processId && f.pageNo === old.pageNo) {
        oldFrame = i;
        break;
      }
    }

    if (oldFrame === null) oldFrame = 0;

    this.frames[oldFrame] = { processId, pageNo };
    
    const oldProc = this.processes.get(old.processId);
    if (oldProc && oldProc.pages) {
      const oldEntry = oldProc.pages.get(old.pageNo);
      if (oldEntry) {
        oldEntry.frameNo = null;
        oldEntry.resident = false;
      }
    }

    const proc = this.processes.get(processId);
    const newEntry = proc.pages.get(pageNo);
    newEntry.frameNo = oldFrame;
    newEntry.resident = true;
    newEntry.loadedAt = Date.now();
    this.fifoQueue.push({ processId, pageNo });
    
    const msg = `REPLACE FIFO: evict ${old.processId}-P${old.pageNo} → load ${processId}-P${pageNo}`;
    this.pageFaults.push(msg);

    return { fault: true, replacement: msg };
  }

  lruReplace(processId, pageNo) {
    let lruItem = null;
    let lruStamp = Infinity;
    let lruFrame = null;

    for (let i = 0; i < this.frames.length; i++) {
      const f = this.frames[i];
      if (!f) continue;
      const key = `${f.processId}-${f.pageNo}`;
      const stamp = this.lruTimestamps.get(key) || Infinity;
      if (stamp < lruStamp) {
        lruStamp = stamp;
        lruItem = f;
        lruFrame = i;
      }
    }

    if (!lruItem) throw new Error('No resident pages for LRU');

    this.frames[lruFrame] = { processId, pageNo };

    const oldProc = this.processes.get(lruItem.processId);
    if (oldProc && oldProc.pages) {
      const oldEntry = oldProc.pages.get(lruItem.pageNo);
      if (oldEntry) {
        oldEntry.frameNo = null;
        oldEntry.resident = false;
      }
    }

    const proc = this.processes.get(processId);
    const newEntry = proc.pages.get(pageNo);
    newEntry.frameNo = lruFrame;
    newEntry.resident = true;
    newEntry.loadedAt = Date.now();
    this.accessCounter++;
    this.lruTimestamps.set(`${processId}-${pageNo}`, this.accessCounter);

    const msg = `REPLACE LRU: evict ${lruItem.processId}-P${lruItem.pageNo} → load ${processId}-P${pageNo}`;
    this.pageFaults.push(msg);

    return { fault: true, replacement: msg };
  }

  // Segmentation
  allocateSegmentation(processId, segmentList) {
    const allocatedRanges = [];
    
    for (const [pid, proc] of this.processes.entries()) {
      if (proc.type === 'segmentation') {
        for (const seg of proc.segments) {
          allocatedRanges.push([seg.base, seg.base + seg.limit]);
        }
      }
    }

    allocatedRanges.sort((a, b) => a[0] - b[0]);

    const freeRanges = [];
    let cursor = 0;
    for (const [a, b] of allocatedRanges) {
      if (cursor < a) {
        freeRanges.push([cursor, a]);
      }
      cursor = Math.max(cursor, b);
    }
    if (cursor < this.memSize) {
      freeRanges.push([cursor, this.memSize]);
    }

    const segments = [];
    for (const { name, size } of segmentList) {
      let allocated = false;
      for (let i = 0; i < freeRanges.length; i++) {
        const [start, end] = freeRanges[i];
        if (end - start >= size) {
          segments.push(new SegmentEntry(name, size, start, size));
          const newStart = start + size;
          if (newStart >= end) {
            freeRanges.splice(i, 1);
          } else {
            freeRanges[i] = [newStart, end];
          }
          allocated = true;
          break;
        }
      }
      if (!allocated) {
        throw new Error(`Unable to allocate segment ${name} of size ${size}`);
      }
    }

    this.processes.set(processId, {
      type: 'segmentation',
      segments,
      totalSize: segments.reduce((sum, s) => sum + s.size, 0)
    });

    return segments;
  }

  deallocate(processId) {
    const proc = this.processes.get(processId);
    if (!proc) return;

    if (proc.type === 'paging') {
      for (const entry of proc.pages.values()) {
        if (entry.resident && entry.frameNo !== null) {
          this.frames[entry.frameNo] = null;
          this.freeFrames.add(entry.frameNo);
        }
      }
      this.fifoQueue = this.fifoQueue.filter(x => x.processId !== processId);
      for (const key of this.lruTimestamps.keys()) {
        if (key.startsWith(processId + '-')) {
          this.lruTimestamps.delete(key);
        }
      }
    }

    this.processes.delete(processId);
  }

  getState() {
    return {
      frames: this.frames.map((f, i) => ({
        frameNo: i,
        status: f ? 'allocated' : 'free',
        process: f?.processId || null,
        page: f?.pageNo ?? null
      })),
      processes: Array.from(this.processes.keys()),
      pageFaults: this.pageFaults,
      freeFrames: Array.from(this.freeFrames)
    };
  }

  reset() {
    this.frames = Array(this.totalFrames).fill(null);
    this.freeFrames = new Set([...Array(this.totalFrames).keys()]);
    this.processes.clear();
    this.pageFaults = [];
    this.fifoQueue = [];
    this.accessCounter = 0;
    this.lruTimestamps.clear();
  }
}
