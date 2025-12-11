import React, { useState, useEffect, useRef } from 'react';
import { useMemoryManager } from './hooks/useMemoryManager';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  HardDrive, 
  Layers, 
  RefreshCw, 
  Play, 
  Download,
  Settings,
  Activity,
  AlertCircle
} from 'lucide-react';
import gsap from 'gsap';
import ControlPanel from './components/ControlPanel';
import FramesVisualizer from './components/FramesVisualizer';
import SegmentsVisualizer from './components/SegmentsVisualizer';
import FaultsTimeline from './components/FaultsTimeline';
import DataTables from './components/DataTables';
import Toast from './components/Toast';
import './App.css';

function App() {
  const {
    state,
    initMemory,
    allocatePaging,
    allocateSegmentation,
    simulateAccess,
    reset,
    getPageTable,
    getSegmentTable,
    manager
  } = useMemoryManager(1024, 64);

  const [toast, setToast] = useState(null);
  const [activeProcess, setActiveProcess] = useState('P1');
  const headerRef = useRef(null);

  useEffect(() => {
    // Enhanced GSAP Header Animation
    if (headerRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(headerRef.current, 
        {
          opacity: 0,
          y: -30,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power4.out'
        }
      );

      // Animate header elements
      tl.fromTo('.header-icon', 
        {
          scale: 0,
          rotate: -180
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        },
        '-=0.7'
      );

      tl.fromTo('.header-title', 
        {
          x: -30,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.5'
      );

      tl.fromTo('.header-subtitle', 
        {
          x: -20,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.4'
      );

      tl.fromTo('.stat-card', 
        {
          y: 20,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out'
        },
        '-=0.3'
      );
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInitMemory = (memSize, frameSize) => {
    initMemory(memSize, frameSize);
    showToast(`Memory initialized: ${Math.floor(memSize / frameSize)} frames`, 'success');
  };

  const handleAllocatePaging = (processId, processSize) => {
    const result = allocatePaging(processId, processSize);
    if (result.success) {
      setActiveProcess(processId);
      showToast(`Process ${processId} allocated with paging`, 'success');
    } else {
      showToast(result.error, 'error');
    }
  };

  const handleAllocateSegmentation = (processId, segments) => {
    const result = allocateSegmentation(processId, segments);
    if (result.success) {
      setActiveProcess(processId);
      showToast(`Process ${processId} allocated with segmentation`, 'success');
    } else {
      showToast(result.error, 'error');
    }
  };

  const handleSimulate = (processId, algorithm) => {
    const result = simulateAccess(processId, algorithm);
    if (result.success) {
      showToast(`Simulation complete using ${algorithm}`, 'info');
    } else {
      showToast(result.error, 'error');
    }
  };

  const handleReset = () => {
    reset();
    setActiveProcess('P1');
    showToast('Memory reset', 'info');
  };

  const handleExport = () => {
    const faults = state.pageFaults.join('\\n');
    if (!faults) {
      showToast('No faults to export', 'info');
      return;
    }
    const blob = new Blob([faults], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page_faults.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Faults exported', 'success');
  };

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="bg-gradient"></div>
      
      {/* Header */}
      <header ref={headerRef} className="header">
        <div className="header-content">
          <div className="header-icon">
            <Cpu size={40} />
          </div>
          <div>
            <h1 className="header-title">Dynamic Memory Management Visualizer</h1>
            <p className="header-subtitle">Paging • Segmentation • FIFO • LRU • Virtual Memory</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="main-grid">
          {/* Control Panel */}
          <ControlPanel
            onInitMemory={handleInitMemory}
            onAllocatePaging={handleAllocatePaging}
            onAllocateSegmentation={handleAllocateSegmentation}
            onSimulate={handleSimulate}
            onReset={handleReset}
            onExport={handleExport}
            activeProcess={activeProcess}
            setActiveProcess={setActiveProcess}
          />

          {/* Visualization Area */}
          <main className="visualization-area">
            {/* Frames */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="viz-section"
            >
              <div className="viz-header">
                <HardDrive size={24} />
                <h2>Memory Frames</h2>
              </div>
              <FramesVisualizer frames={state.frames} />
            </motion.section>

            {/* Segments */}
            {state.processes.some(pid => manager.processes.get(pid)?.type === 'segmentation') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="viz-section"
              >
                <div className="viz-header">
                  <Layers size={24} />
                  <h2>Segments</h2>
                </div>
                <SegmentsVisualizer
                  processes={state.processes}
                  getSegmentTable={getSegmentTable}
                />
              </motion.section>
            )}

            {/* Page Faults */}
            {state.pageFaults.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="viz-section"
              >
                <div className="viz-header">
                  <AlertCircle size={24} />
                  <h2>Page Faults Timeline</h2>
                </div>
                <FaultsTimeline faults={state.pageFaults} />
              </motion.section>
            )}

            {/* Data Tables */}
            <DataTables
              processes={state.processes}
              getPageTable={getPageTable}
              getSegmentTable={getSegmentTable}
              pageFaults={state.pageFaults}
              activeProcess={activeProcess}
            />
          </main>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
