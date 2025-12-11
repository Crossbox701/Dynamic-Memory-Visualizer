import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Database,
  BarChart2
} from 'lucide-react';
import { 
  calculateFragmentation, 
  calculateEfficiency,
  analyzeAccessPatterns,
  calculateHealthScore 
} from '../utils/memoryUtils';
import './AdvancedStats.css';

const AdvancedStats = ({ state }) => {
  const fragmentation = calculateFragmentation(state.frames);
  const efficiency = calculateEfficiency(state);
  const accessPatterns = analyzeAccessPatterns(state.pageFaults);
  const healthScore = calculateHealthScore(state);

  const getHealthStatus = (score) => {
    if (score >= 80) return { text: 'Excellent', color: 'success', icon: CheckCircle };
    if (score >= 60) return { text: 'Good', color: 'warning', icon: Info };
    return { text: 'Poor', color: 'danger', icon: AlertTriangle };
  };

  const health = getHealthStatus(healthScore);
  const HealthIcon = health.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="advanced-stats"
    >
      <div className="stats-header">
        <Activity size={24} />
        <h3>Advanced Analytics</h3>
      </div>

      <div className="stats-grid">
        {/* Memory Health */}
        <div className={`stat-card health-${health.color}`}>
          <div className="stat-icon">
            <HealthIcon size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{healthScore}</div>
            <div className="stat-label">Memory Health</div>
            <div className="stat-status">{health.text}</div>
          </div>
          <div className="stat-progress">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${healthScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Efficiency Score */}
        <div className="stat-card">
          <div className="stat-icon">
            <Zap size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{efficiency.efficiency}%</div>
            <div className="stat-label">Efficiency Score</div>
            <div className="stat-info">
              {efficiency.utilization > 80 ? (
                <TrendingUp size={16} className="trending-up" />
              ) : (
                <TrendingDown size={16} className="trending-down" />
              )}
              <span>{efficiency.utilization}% utilized</span>
            </div>
          </div>
        </div>

        {/* Fragmentation */}
        <div className="stat-card">
          <div className="stat-icon">
            <Database size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{fragmentation.external}%</div>
            <div className="stat-label">Fragmentation</div>
            <div className="stat-info">
              <span>{fragmentation.freeBlocks} free blocks</span>
            </div>
          </div>
        </div>

        {/* Access Patterns */}
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{accessPatterns.uniquePages}</div>
            <div className="stat-label">Unique Pages</div>
            <div className="stat-info">
              <span>{accessPatterns.totalAccesses} total accesses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="detailed-metrics">
        <div className="metric-row">
          <span className="metric-label">Free Blocks:</span>
          <span className="metric-value">{fragmentation.freeBlocks}</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Largest Free Block:</span>
          <span className="metric-value">{fragmentation.largestFreeBlock} frames</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Fragmented Frames:</span>
          <span className="metric-value">{fragmentation.fragmentedFrames}</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Wasted Space:</span>
          <span className="metric-value">{efficiency.wastedSpace} frames</span>
        </div>
        {accessPatterns.mostAccessedPage && (
          <div className="metric-row">
            <span className="metric-label">Most Accessed Page:</span>
            <span className="metric-value">
              Page {accessPatterns.mostAccessedPage.page} ({accessPatterns.mostAccessedPage.count}x)
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdvancedStats;
