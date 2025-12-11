import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import './MemoryChart.css';

const MemoryChart = ({ stats }) => {
  const progressRef = useRef(null);
  const { used, free, total, utilization } = stats;

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${utilization}%`,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, [utilization]);

  const getUtilizationColor = () => {
    if (utilization < 50) return '#00d084';
    if (utilization < 75) return '#ffb347';
    return '#ff5757';
  };

  const getUtilizationStatus = () => {
    if (utilization < 50) return 'Optimal';
    if (utilization < 75) return 'Moderate';
    return 'High';
  };

  return (
    <motion.div 
      className="memory-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="chart-header">
        <PieChart size={24} />
        <h3>Memory Utilization</h3>
        <span className={`status-indicator status-${getUtilizationStatus().toLowerCase()}`}>
          {getUtilizationStatus()}
        </span>
      </div>

      <div className="utilization-display">
        <div className="utilization-value">
          <span className="percentage">{utilization}%</span>
          <span className="label">Used</span>
        </div>
        <TrendingUp size={32} style={{ color: getUtilizationColor() }} />
      </div>

      <div className="progress-bar">
        <div 
          ref={progressRef}
          className="progress-fill"
          style={{ backgroundColor: getUtilizationColor() }}
        />
      </div>

      <div className="memory-breakdown">
        <div className="breakdown-item">
          <BarChart3 size={16} />
          <div className="breakdown-info">
            <span className="breakdown-label">Used Frames</span>
            <span className="breakdown-value">{used} / {total}</span>
          </div>
        </div>
        <div className="breakdown-item">
          <BarChart3 size={16} />
          <div className="breakdown-info">
            <span className="breakdown-label">Free Frames</span>
            <span className="breakdown-value">{free}</span>
          </div>
        </div>
      </div>

      <div className="chart-footer">
        <div className="metric">
          <span className="metric-value">{Math.round((used / total) * 100) || 0}%</span>
          <span className="metric-label">Allocation Rate</span>
        </div>
        <div className="metric">
          <span className="metric-value">{total}</span>
          <span className="metric-label">Total Capacity</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryChart;
