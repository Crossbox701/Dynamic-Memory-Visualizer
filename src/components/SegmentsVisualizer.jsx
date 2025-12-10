import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './SegmentsVisualizer.css';

const SegmentsVisualizer = ({ processes, getSegmentTable }) => {
  const containerRef = useRef(null);

  const allSegments = [];
  processes.forEach(pid => {
    const segments = getSegmentTable(pid);
    if (segments) {
      segments.forEach(seg => {
        allSegments.push({ ...seg, process: pid });
      });
    }
  });

  useEffect(() => {
    if (containerRef.current && allSegments.length > 0) {
      const segElements = containerRef.current.querySelectorAll('.segment');
      gsap.fromTo(
        segElements,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [allSegments.length]);

  if (allSegments.length === 0) {
    return (
      <div className="empty-state">
        <p>No segments allocated yet</p>
      </div>
    );
  }

  const totalSize = allSegments.reduce((sum, seg) => sum + seg.size, 0);

  return (
    <div ref={containerRef} className="segments-container">
      {allSegments.map((seg, idx) => {
        const widthPercent = (seg.size / totalSize) * 100;
        return (
          <motion.div
            key={`${seg.process}-${seg.name}-${idx}`}
            className="segment"
            style={{ flex: seg.size }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="segment-name">{seg.name}</div>
            <div className="segment-size">{seg.size}b</div>
            <div className="segment-info">Base: {seg.base}</div>
            <div className="segment-process">{seg.process}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SegmentsVisualizer;
