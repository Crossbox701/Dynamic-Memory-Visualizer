import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, AlertTriangle } from 'lucide-react';
import './DataTables.css';

const DataTables = ({ processes, getPageTable, getSegmentTable, pageFaults, activeProcess }) => {
  const pageTable = getPageTable(activeProcess);
  const segmentTable = getSegmentTable(activeProcess);

  return (
    <div className="tables-grid">
      {/* Page Table */}
      {pageTable && (
        <motion.div
          className="table-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="table-header">
            <FileText size={20} />
            <h3>Page Table - {activeProcess}</h3>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Frame</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pageTable.map(entry => (
                  <tr key={entry.pageNo}>
                    <td>{entry.pageNo}</td>
                    <td>{entry.frameNo !== null ? entry.frameNo : '-'}</td>
                    <td>
                      <span className={`status-badge ${entry.resident ? 'resident' : 'not-resident'}`}>
                        {entry.resident ? '✓ Resident' : '✗ Not Resident'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Segment Table */}
      {segmentTable && (
        <motion.div
          className="table-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="table-header">
            <Database size={20} />
            <h3>Segment Table - {activeProcess}</h3>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Segment</th>
                  <th>Base</th>
                  <th>Limit</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {segmentTable.map((seg, idx) => (
                  <tr key={idx}>
                    <td>{seg.name}</td>
                    <td>{seg.base}</td>
                    <td>{seg.limit}</td>
                    <td>{seg.size}b</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Fault Log */}
      {pageFaults.length > 0 && (
        <motion.div
          className="table-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="table-header">
            <AlertTriangle size={20} />
            <h3>Fault Log</h3>
          </div>
          <div className="log-scroll">
            {pageFaults.map((fault, idx) => (
              <div key={idx} className="log-item">
                <span className="log-index">{idx + 1}</span>
                <span className="log-text">{fault}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DataTables;
