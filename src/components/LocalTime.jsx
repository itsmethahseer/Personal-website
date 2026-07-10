import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LocalTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 24px',
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--glass-border)',
      borderRadius: '999px',
      fontSize: '0.875rem',
      color: 'var(--on-surface-variant)',
      fontFamily: 'var(--font-label)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      marginTop: '32px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <motion.div 
          animate={{ opacity: [1, 0.3, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} 
        />
        <span style={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Available</span>
      </div>
      <span style={{ opacity: 0.3 }}>|</span>
      <span style={{ letterSpacing: '0.05em' }}>Global</span>
      <span style={{ opacity: 0.3 }}>|</span>
      <span style={{ fontWeight: 700, color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>{timeString}</span>
    </div>
  );
}
