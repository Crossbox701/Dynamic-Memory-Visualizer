import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type = 'success' }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <Info size={20} />
  };

  return (
    <motion.div
      className={`toast toast-${type}`}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-message">{message}</div>
    </motion.div>
  );
};

export default Toast;
