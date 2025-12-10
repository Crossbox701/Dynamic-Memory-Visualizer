import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './FaultsTimeline.css';

const FaultsTimeline = ({ faults }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && faults.length > 0) {
      const faultElements = containerRef.current.querySelectorAll('.fault-item');
      const newElements = Array.from(faultElements).slice(-1);
      if (newElements.length > 0) {
        gsap.fromTo(
          newElements,
          { scale: 0, rotate: -10 },
          { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
        );
      }
    }
  }, [faults.length]);

  if (!faults || faults.length === 0) {
    return (
      <div className="empty-state">
        <p>No page faults yet</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="faults-timeline">
      {faults.map((fault, idx) => (
        <motion.div
          key={idx}
          className="fault-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
        >
          {fault}
        </motion.div>
      ))}
    </div>
  );
};

export default FaultsTimeline;
