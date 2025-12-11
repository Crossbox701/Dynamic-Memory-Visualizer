/**
 * Memory Management Utility Functions
 */

/**
 * Calculate memory fragmentation percentage
 * @param {Array} frames - Array of memory frames
 * @returns {Object} - Fragmentation stats
 */
export const calculateFragmentation = (frames) => {
  if (!frames || frames.length === 0) {
    return { internal: 0, external: 0, total: 0 };
  }

  let freeBlocks = 0;
  let largestFreeBlock = 0;
  let currentFreeBlock = 0;
  
  frames.forEach((frame, index) => {
    if (frame.status === 'free') {
      currentFreeBlock++;
      if (index === frames.length - 1 || frames[index + 1].status !== 'free') {
        freeBlocks++;
        largestFreeBlock = Math.max(largestFreeBlock, currentFreeBlock);
        currentFreeBlock = 0;
      }
    }
  });

  const totalFree = frames.filter(f => f.status === 'free').length;
  const externalFragmentation = totalFree > 0 && freeBlocks > 1
    ? ((1 - largestFreeBlock / totalFree) * 100).toFixed(1)
    : 0;

  return {
    freeBlocks,
    largestFreeBlock,
    totalFree,
    external: parseFloat(externalFragmentation),
    fragmentedFrames: totalFree - largestFreeBlock
  };
};

/**
 * Get detailed process statistics
 * @param {Array} processes - Array of process IDs
 * @param {Object} manager - Memory manager instance
 * @returns {Array} - Array of process stats
 */
export const getProcessStats = (processes, manager) => {
  if (!processes || !manager) return [];

  return processes.map(pid => {
    const process = manager.processes.get(pid);
    if (!process) return null;

    const stats = {
      id: pid,
      type: process.type,
      size: process.size || 0,
      framesAllocated: 0,
      segments: []
    };

    if (process.type === 'paging') {
      stats.framesAllocated = process.pageTable ? process.pageTable.length : 0;
      stats.pageTableSize = stats.framesAllocated;
    } else if (process.type === 'segmentation') {
      stats.segments = process.segments || [];
      stats.framesAllocated = stats.segments.reduce((sum, seg) => sum + (seg.frames || 0), 0);
      stats.segmentCount = stats.segments.length;
    }

    return stats;
  }).filter(Boolean);
};

/**
 * Calculate memory efficiency metrics
 * @param {Object} state - Memory manager state
 * @returns {Object} - Efficiency metrics
 */
export const calculateEfficiency = (state) => {
  if (!state || !state.frames) {
    return { efficiency: 0, wastedSpace: 0, utilization: 0 };
  }

  const total = state.frames.length;
  const used = state.frames.filter(f => f.status === 'allocated' || f.status === 'accessed').length;
  const utilization = total > 0 ? (used / total) * 100 : 0;
  
  const faultRate = state.pageFaults.length;
  const efficiency = utilization > 0 && faultRate > 0
    ? (utilization / (1 + Math.log(faultRate + 1))).toFixed(1)
    : utilization.toFixed(1);

  return {
    efficiency: parseFloat(efficiency),
    utilization: parseFloat(utilization.toFixed(1)),
    faultRate,
    wastedSpace: total - used
  };
};

/**
 * Generate memory usage report
 * @param {Object} state - Memory manager state
 * @param {Object} manager - Memory manager instance
 * @returns {String} - Formatted report
 */
export const generateReport = (state, manager) => {
  const timestamp = new Date().toISOString();
  const fragmentation = calculateFragmentation(state.frames);
  const efficiency = calculateEfficiency(state);
  const processStats = getProcessStats(state.processes, manager);

  let report = `Memory Management Report
Generated: ${timestamp}
${'='.repeat(60)}

MEMORY OVERVIEW
${'-'.repeat(60)}
Total Frames: ${state.frames.length}
Used Frames: ${state.frames.filter(f => f.status !== 'free').length}
Free Frames: ${state.frames.filter(f => f.status === 'free').length}
Utilization: ${efficiency.utilization}%
Efficiency: ${efficiency.efficiency}%

FRAGMENTATION ANALYSIS
${'-'.repeat(60)}
Free Blocks: ${fragmentation.freeBlocks}
Largest Free Block: ${fragmentation.largestFreeBlock} frames
External Fragmentation: ${fragmentation.external}%
Fragmented Frames: ${fragmentation.fragmentedFrames}

PAGE FAULTS
${'-'.repeat(60)}
Total Faults: ${state.pageFaults.length}
Fault Rate: ${efficiency.faultRate}

PROCESS STATISTICS
${'-'.repeat(60)}
`;

  processStats.forEach((proc, index) => {
    report += `
Process ${index + 1}: ${proc.id}
  Type: ${proc.type}
  Frames Allocated: ${proc.framesAllocated}`;
    
    if (proc.type === 'paging') {
      report += `
  Page Table Size: ${proc.pageTableSize}`;
    } else if (proc.type === 'segmentation') {
      report += `
  Segment Count: ${proc.segmentCount}
  Segments:`;
      proc.segments.forEach(seg => {
        report += `
    ${seg.name}: ${seg.size} bytes (${seg.frames} frames)`;
      });
    }
    report += '\n';
  });

  report += `
${'='.repeat(60)}
End of Report
`;

  return report;
};

/**
 * Analyze memory access patterns
 * @param {Array} pageFaults - Array of page faults
 * @returns {Object} - Access pattern analysis
 */
export const analyzeAccessPatterns = (pageFaults) => {
  if (!pageFaults || pageFaults.length === 0) {
    return { 
      totalAccesses: 0, 
      uniquePages: 0, 
      avgAccessesPerPage: 0,
      mostAccessedPage: null 
    };
  }

  const pageAccessCount = new Map();
  
  pageFaults.forEach(fault => {
    const page = fault.page || fault.pageId;
    pageAccessCount.set(page, (pageAccessCount.get(page) || 0) + 1);
  });

  const mostAccessed = Array.from(pageAccessCount.entries())
    .sort((a, b) => b[1] - a[1])[0];

  return {
    totalAccesses: pageFaults.length,
    uniquePages: pageAccessCount.size,
    avgAccessesPerPage: (pageFaults.length / pageAccessCount.size).toFixed(2),
    mostAccessedPage: mostAccessed ? { page: mostAccessed[0], count: mostAccessed[1] } : null,
    accessDistribution: Object.fromEntries(pageAccessCount)
  };
};

/**
 * Predict memory requirements
 * @param {Array} processStats - Array of process statistics
 * @returns {Object} - Memory predictions
 */
export const predictMemoryNeeds = (processStats) => {
  if (!processStats || processStats.length === 0) {
    return { recommended: 0, minimum: 0, optimal: 0 };
  }

  const totalFrames = processStats.reduce((sum, proc) => sum + proc.framesAllocated, 0);
  const avgFramesPerProcess = totalFrames / processStats.length;

  return {
    current: totalFrames,
    minimum: Math.ceil(totalFrames * 1.1), // 10% overhead
    recommended: Math.ceil(totalFrames * 1.3), // 30% overhead
    optimal: Math.ceil(totalFrames * 1.5), // 50% overhead
    avgPerProcess: Math.ceil(avgFramesPerProcess)
  };
};

/**
 * Export memory state to JSON
 * @param {Object} state - Memory manager state
 * @param {Object} manager - Memory manager instance
 * @returns {String} - JSON string
 */
export const exportStateToJSON = (state, manager) => {
  const exportData = {
    timestamp: new Date().toISOString(),
    frames: state.frames.map(f => ({
      id: f.id,
      status: f.status,
      processId: f.processId,
      pageId: f.pageId
    })),
    processes: getProcessStats(state.processes, manager),
    pageFaults: state.pageFaults,
    metrics: {
      fragmentation: calculateFragmentation(state.frames),
      efficiency: calculateEfficiency(state),
      accessPatterns: analyzeAccessPatterns(state.pageFaults)
    }
  };

  return JSON.stringify(exportData, null, 2);
};

/**
 * Calculate memory health score (0-100)
 * @param {Object} state - Memory manager state
 * @returns {Number} - Health score
 */
export const calculateHealthScore = (state) => {
  if (!state || !state.frames || state.frames.length === 0) return 100;

  const efficiency = calculateEfficiency(state);
  const fragmentation = calculateFragmentation(state.frames);
  
  // Scoring factors
  const utilizationScore = Math.min(efficiency.utilization, 80); // Optimal is 80%
  const fragmentationPenalty = fragmentation.external;
  const faultPenalty = Math.min(state.pageFaults.length / 10, 30); // Max 30 point penalty

  const score = utilizationScore - fragmentationPenalty - faultPenalty;
  return Math.max(0, Math.min(100, score)).toFixed(0);
};
