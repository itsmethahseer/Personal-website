import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AmbientLight() {
  const { scrollYProgress } = useScroll();
  
  // Dynamically change colors based on scroll position for intelligent lighting
  const color1 = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.6, 1], 
    ['rgba(0, 65, 200, 0.08)', 'rgba(185, 0, 64, 0.08)', 'rgba(0, 87, 108, 0.08)', 'rgba(0, 65, 200, 0.08)']
  );
  
  const color2 = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.6, 1], 
    ['rgba(185, 0, 64, 0.08)', 'rgba(0, 65, 200, 0.08)', 'rgba(227, 23, 84, 0.08)', 'rgba(185, 0, 64, 0.08)']
  );

  return (
    <>
      <motion.div 
        className="bg-gradient-spot spot-primary"
        style={{ backgroundColor: color1, mixBlendMode: 'multiply' }}
        animate={{
          x: ['-10%', '10%', '-5%', '-10%'],
          y: ['-10%', '5%', '15%', '-10%'],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="bg-gradient-spot spot-secondary"
        style={{ backgroundColor: color2, mixBlendMode: 'multiply' }}
        animate={{
          x: ['10%', '-15%', '5%', '10%'],
          y: ['10%', '20%', '-5%', '10%'],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
