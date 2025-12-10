import { useState, useCallback } from 'react';
import { MemoryManager } from '../utils/MemoryManager';

export const useMemoryManager = (initialMemSize = 1024, initialFrameSize = 64) => {
  const [manager, setManager] = useState(() => new MemoryManager(initialMemSize, initialFrameSize));
  const [state, setState] = useState(manager.getState());

  const updateState = useCallback(() => {
    setState(manager.getState());
  }, [manager]);

  const initMemory = useCallback((memSize, frameSize) => {
    const newManager = new MemoryManager(memSize, frameSize);
    setManager(newManager);
    setState(newManager.getState());
  }, []);

  const allocatePaging = useCallback((processId, processSize) => {
    try {
      manager.allocatePaging(processId, processSize);
      updateState();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [manager, updateState]);

  const allocateSegmentation = useCallback((processId, segments) => {
    try {
      manager.allocateSegmentation(processId, segments);
      updateState();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [manager, updateState]);

  const simulateAccess = useCallback((processId, algorithm = 'FIFO') => {
    try {
      const proc = manager.processes.get(processId);
      if (!proc || proc.type !== 'paging') {
        return { success: false, error: 'Process not found or not paging' };
      }

      const pages = Array.from(proc.pages.keys());
      for (const p of pages) {
        manager.accessPage(processId, p, algorithm);
      }
      updateState();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [manager, updateState]);

  const reset = useCallback(() => {
    manager.reset();
    updateState();
  }, [manager, updateState]);

  const getPageTable = useCallback((processId) => {
    const proc = manager.processes.get(processId);
    if (!proc || proc.type !== 'paging') return null;
    return Array.from(proc.pages.entries()).map(([pageNo, entry]) => ({
      pageNo,
      frameNo: entry.frameNo,
      resident: entry.resident
    }));
  }, [manager]);

  const getSegmentTable = useCallback((processId) => {
    const proc = manager.processes.get(processId);
    if (!proc || proc.type !== 'segmentation') return null;
    return proc.segments;
  }, [manager]);

  return {
    state,
    initMemory,
    allocatePaging,
    allocateSegmentation,
    simulateAccess,
    reset,
    getPageTable,
    getSegmentTable,
    manager
  };
};
