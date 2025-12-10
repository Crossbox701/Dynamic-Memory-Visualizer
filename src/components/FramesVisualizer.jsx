import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './FramesVisualizer.css';

const FramesVisualizer = ({ frames }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const frameElements = containerRef.current.querySelectorAll('.frame');
      gsap.fromTo(
        frameElements,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.02, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [frames]);

  if (!frames || frames.length === 0) {
    return (
      <div className="empty-state">
        <p>No frames allocated yet</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="frames-grid">
      {frames.map((frame) => (
        <motion.div
          key={frame.frameNo}
          className={`frame frame-${frame.status}`}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="frame-number">F{frame.frameNo}</div>
          {frame.status === 'allocated' ? (
            <div className="frame-content">
              <span className="process-name">{frame.process}</span>
              <span className="page-number">P{frame.page}</span>
            </div>
          ) : (
            <div className="frame-free">FREE</div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FramesVisualizer;
