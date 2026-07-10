import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

export default function CircularProjects({ projects }) {
  const rotation = useMotionValue(0);
  
  // Spring physics for buttery smooth swiping and momentum
  const smoothRotation = useSpring(rotation, { damping: 20, stiffness: 100 });
  const [isDragging, setIsDragging] = useState(false);

  // Infinite slow auto-rotation
  useAnimationFrame((t, delta) => {
    if (!isDragging) {
      // 0.005 controls the "micro seconds" ultra-slow continuous spin
      rotation.set(rotation.get() - delta * 0.008); 
    }
  });

  const numProjects = Math.max(projects.length, 4); 
  const radius = Math.max(450, (numProjects * 400) / (2 * Math.PI));

  return (
    // Replaced 400vh scroll-hijack with a standard 100vh section since it auto-spins now
    <section id="projects" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', perspective: '2000px' }}>
      
      {/* Fixed Section Header */}
      <div style={{ position: 'absolute', top: '15vh', left: 'max(20px, 5vw)', zIndex: 10, pointerEvents: 'none' }}>
        <h2 className="text-headline-lg" style={{ marginBottom: '16px' }}>
          Selected <span className="italic text-primary">Works</span>
        </h2>
        <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
          Swipe or drag to explore.
        </p>
      </div>

      {/* Central AI Core Image & Aura */}
      <div style={{ position: 'absolute', zIndex: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
        <motion.div 
          style={{ 
            width: '400px', 
            height: '400px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', 
            filter: 'blur(40px)', 
            opacity: 0.3 
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
           <img 
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4C9RWy7b91XGTJMcrM0mDxY00H8v8dPyElgzKeSjMLeTYPWie16xljBNM1vxtIp9DGBVVBtEWRLCg7ZuRjAjBFrK0MC3EuiBseQ_4XHL--SfInI7ddaCjI08vvyokf9JvGOdiiiLC4Afk8HSXn_f41dkVG9hvC-POueAxdJU2qLESeyKdGKBClmfVqZcl8QuwLY2_vPPxHYHY6I2_1uCwerB2iPIKqAneliUdEsqDLQBgvhOYMZ30w51ojW4NhtgNef22_uUwyg" 
             style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', animation: 'spinCore 30s linear infinite', border: '1px solid rgba(255,255,255,0.1)' }} 
             alt="AI Neural Core" 
             draggable={false}
           />
           <h3 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '1rem', letterSpacing: '0.4em', whiteSpace: 'nowrap', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
             NEURAL CORE
           </h3>
           <style>{`@keyframes spinCore { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>

      {/* 3D Rotating Cylinder Drag Area */}
      <motion.div 
        style={{ 
          width: '350px', 
          height: '500px', 
          position: 'relative', 
          transformStyle: 'preserve-3d',
          rotateY: smoothRotation,
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: 10
        }}
        // onPan handles mouse drag and touch swipe without actually translating the div's X/Y position
        onPanStart={() => setIsDragging(true)}
        onPanEnd={() => setIsDragging(false)}
        onPan={(e, info) => {
          // Multiply drag distance by sensitivity factor to convert to degrees
          rotation.set(rotation.get() + info.delta.x * 0.4);
        }}
      >
        {projects.map((project, i) => {
          const angle = (360 / numProjects) * i;
          return (
            <div 
              key={i}
              className="interactive spotlight-card"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                backgroundColor: 'var(--surface)',
                // Disable pointer events on cards ONLY while dragging so it doesn't interrupt the swipe
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            >
              <img 
                src={project.img} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                draggable={false} // Prevents default browser image drag
              />
              
              {/* 3D Popping Glass Content Box */}
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '24px', 
                  left: '24px', 
                  right: '24px', 
                  background: 'rgba(10, 10, 10, 0.6)', 
                  padding: '24px', 
                  borderRadius: '1rem', 
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transform: 'translateZ(40px)', 
                  transition: 'transform 0.3s'
                }}
              >
                <h3 className="text-headline-md" style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>{project.title}</h3>
                {project.desc && <p className="text-body-md" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>{project.desc}</p>}
              </div>
            </div>
          );
        })}
      </motion.div>

    </section>
  );
}
