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
        { 
          scale: 0.7, 
          opacity: 0,
          y: 30,
          rotateY: -45
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: {
            amount: 0.6,
            grid: 'auto',
            from: 'start'
          },
          duration: 0.6,
          ease: 'power3.out'
        }
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
          whileHover={{ 
            scale: 1.08, 
            rotate: 3,
            transition: { type: 'spring', stiffness: 300, damping: 15 }
          }}
          whileTap={{ scale: 0.92 }}
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
