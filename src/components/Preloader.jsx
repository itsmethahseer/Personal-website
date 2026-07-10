import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed', 
        inset: 0, 
        zIndex: 99999,
        background: 'var(--on-surface)', 
        color: 'var(--white)',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ fontSize: '10vw', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
        {Math.min(progress, 100)}%
      </div>
      <div style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '1rem', marginTop: '1.5rem', color: 'var(--primary)', fontWeight: 600 }}>
        Initializing Experience
      </div>
      
      {/* Animated loading bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: '6px', background: 'var(--primary)', width: `${progress}%`, transition: 'width 0.2s ease-out' }} />
    </motion.div>
  );
}
