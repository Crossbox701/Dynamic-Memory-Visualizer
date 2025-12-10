import React, { useState } from 'react';
import { Settings, Play, RefreshCw, Download, Cpu, Database } from 'lucide-react';
import './ControlPanel.css';

const ControlPanel = ({
  onInitMemory,
  onAllocatePaging,
  onAllocateSegmentation,
  onSimulate,
  onReset,
  onExport,
  activeProcess,
  setActiveProcess
}) => {
  const [memSize, setMemSize] = useState(1024);
  const [frameSize, setFrameSize] = useState(64);
  const [processSize, setProcessSize] = useState(200);
  const [segments, setSegments] = useState('code:100,data:200,stack:50');
  const [algorithm, setAlgorithm] = useState('FIFO');

  return (
    <aside className="control-panel">
      {/* Memory Config */}
      <div className="panel-section">
        <div className="section-header">
          <Settings size={20} />
          <h3>Memory Configuration</h3>
        </div>
        <div className="form-group">
          <label>Memory Size (bytes)</label>
          <input
            type="number"
            value={memSize}
            onChange={(e) => setMemSize(Number(e.target.value))}
            min="64"
            step="64"
          />
        </div>
        <div className="form-group">
          <label>Frame Size (bytes)</label>
          <input
            type="number"
            value={frameSize}
            onChange={(e) => setFrameSize(Number(e.target.value))}
            min="16"
            step="16"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onInitMemory(memSize, frameSize)}
        >
          <Settings size={18} />
          Initialize Memory
        </button>
      </div>

      {/* Process Allocation */}
      <div className="panel-section">
        <div className="section-header">
          <Cpu size={20} />
          <h3>Process Allocation</h3>
        </div>
        <div className="form-group">
          <label>Process Name</label>
          <input
            type="text"
            value={activeProcess}
            onChange={(e) => setActiveProcess(e.target.value)}
            placeholder="P1"
          />
        </div>
        <div className="form-group">
          <label>Process Size (bytes)</label>
          <input
            type="number"
            value={processSize}
            onChange={(e) => setProcessSize(Number(e.target.value))}
            min="1"
          />
        </div>
        <button
          className="btn btn-success"
          onClick={() => onAllocatePaging(activeProcess, processSize)}
        >
          <Database size={18} />
          Allocate Paging
        </button>
      </div>

      {/* Segmentation */}
      <div className="panel-section">
        <div className="section-header">
          <Database size={20} />
          <h3>Segmentation</h3>
        </div>
        <div className="form-group">
          <label>Segments (name:size,...)</label>
          <input
            type="text"
            value={segments}
            onChange={(e) => setSegments(e.target.value)}
            placeholder="code:100,data:200"
          />
        </div>
        <button
          className="btn btn-success"
          onClick={() => {
            const segList = segments.split(',').map(s => {
              const [name, size] = s.split(':');
              return { name: name.trim(), size: Number(size) };
            }).filter(s => s.name && s.size);
            onAllocateSegmentation(activeProcess, segList);
          }}
        >
          <Database size={18} />
          Allocate Segmentation
        </button>
      </div>

      {/* Simulation */}
      <div className="panel-section">
        <div className="section-header">
          <Play size={20} />
          <h3>Page Replacement</h3>
        </div>
        <div className="form-group">
          <label>Algorithm</label>
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
            <option value="FIFO">FIFO</option>
            <option value="LRU">LRU</option>
          </select>
        </div>
        <button
          className="btn btn-info"
          onClick={() => onSimulate(activeProcess, algorithm)}
        >
          <Play size={18} />
          Run Simulation
        </button>
      </div>

      {/* Actions */}
      <div className="panel-section">
        <button className="btn btn-warning" onClick={onExport}>
          <Download size={18} />
          Export Faults
        </button>
        <button className="btn btn-danger" onClick={onReset}>
          <RefreshCw size={18} />
          Reset
        </button>
      </div>
    </aside>
  );
};

export default ControlPanel;
