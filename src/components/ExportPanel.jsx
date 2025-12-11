import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileJson, FileText, Save } from 'lucide-react';
import { generateReport, exportStateToJSON } from '../utils/memoryUtils';
import './ExportPanel.css';

const ExportPanel = ({ state, manager }) => {
  const [exportStatus, setExportStatus] = useState('');

  const handleExportReport = () => {
    try {
      const report = generateReport(state, manager);
      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `memory-report-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('Report exported successfully!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      setExportStatus('Export failed');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const handleExportJSON = () => {
    try {
      const jsonData = exportStateToJSON(state, manager);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `memory-state-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('JSON exported successfully!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      setExportStatus('Export failed');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const handleExportFaults = () => {
    try {
      const faults = state.pageFaults.map((fault, index) => 
        `${index + 1}. ${fault.timestamp || 'N/A'} - Page ${fault.page || fault.pageId} - ${fault.algorithm || 'N/A'}`
      ).join('\n');
      
      if (!faults) {
        setExportStatus('No page faults to export');
        setTimeout(() => setExportStatus(''), 3000);
        return;
      }

      const blob = new Blob([faults], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `page-faults-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('Page faults exported!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      setExportStatus('Export failed');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="export-panel"
    >
      <div className="export-header">
        <Download size={24} />
        <h3>Export Data</h3>
      </div>

      <div className="export-buttons">
        <button 
          className="export-btn report-btn"
          onClick={handleExportReport}
        >
          <FileText size={20} />
          <span>Export Full Report</span>
        </button>

        <button 
          className="export-btn json-btn"
          onClick={handleExportJSON}
        >
          <FileJson size={20} />
          <span>Export as JSON</span>
        </button>

        <button 
          className="export-btn faults-btn"
          onClick={handleExportFaults}
          disabled={state.pageFaults.length === 0}
        >
          <Save size={20} />
          <span>Export Page Faults</span>
        </button>
      </div>

      {exportStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`export-status ${exportStatus.includes('failed') ? 'error' : 'success'}`}
        >
          {exportStatus}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExportPanel;
