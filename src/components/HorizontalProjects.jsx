import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div 
      className={`project-card spotlight-card interactive`} 
      style={{ 
        width: '60vw', 
        minWidth: '300px',
        maxWidth: '800px',
        height: '70vh', 
        flexShrink: 0,
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
    >
      <div className="project-overlay"></div>
      <motion.img 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        src={project.img} 
        alt={project.title} 
        className="project-image" 
      />
      <div className="project-content">
        {project.tags && (
          <div className="project-tags">
            {project.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
        )}
        <h3 className="text-headline-md project-title" style={{ fontSize: project.titleSize || '2rem' }}>{project.title}</h3>
        {project.desc && <p className="text-body-md project-desc" style={{ fontSize: project.descSize || '1rem' }}>{project.desc}</p>}
      </div>
    </motion.div>
  );
};

export default function HorizontalProjects({ projects }) {
  const targetRef = useRef(null);
  
  // Track scroll position within this specific section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress (0 to 1) to horizontal translation (0% to -X%)
  // Since we have 4 items of ~60vw each, we need to translate enough to see them all
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} id="projects" style={{ position: 'relative', height: '400vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Section Header pinned to the left */}
        <div style={{ position: 'absolute', top: '15vh', left: 'max(20px, 5vw)', zIndex: 10 }}>
          <h2 className="text-headline-lg" style={{ marginBottom: '16px' }}>
            Selected <span className="italic text-primary">Works</span>
          </h2>
          <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
            Scroll to explore.
          </p>
        </div>

        {/* Scrolling Track */}
        <motion.div style={{ x, display: 'flex', gap: '48px', paddingLeft: 'max(20px, 5vw)', paddingTop: '10vh' }}>
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
          {/* Spacer at the end so the last card isn't touching the edge */}
          <div style={{ width: '10vw', flexShrink: 0 }}></div>
        </motion.div>

      </div>
    </section>
  );
}
