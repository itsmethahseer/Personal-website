import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Magnetic from './components/Magnetic';
import TextReveal from './components/TextReveal';
import Typewriter from './components/Typewriter';
import Preloader from './components/Preloader';
import NoiseOverlay from './components/NoiseOverlay';
import LocalTime from './components/LocalTime';
import AmbientLight from './components/AmbientLight';
import CircularProjects from './components/CircularProjects';
import './App.css';
import './components/Enhancements.css';

// Custom Smooth Scroll Wrapper using core Lenis
const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  
  return <>{children}</>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', damping: 40, stiffness: 40, mass: 2 } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.1 },
  },
};

const TimelineCard = ({ experience }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div ref={ref} className="timeline-item" variants={fadeUp}>
      <div className={`timeline-dot ${experience.active ? 'active' : ''} interactive`}>
        {experience.active && <div className="timeline-inner-dot"></div>}
      </div>
      <motion.div style={{ x }} className="glass" style={{ padding: '32px', borderRadius: '1.5rem', marginLeft: '16px', background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}>
        <span className={`text-label-md ${experience.active ? 'text-primary' : ''}`} style={{ display: 'block', marginBottom: '8px', color: experience.active ? undefined : 'var(--on-surface-variant)' }}>
          {experience.date}
        </span>
        <h3 className="text-headline-md" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{experience.role}</h3>
        <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
          {experience.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkillsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const skills = [
    { name: 'FRONTEND', desc: 'React, Next.js, TypeScript', icon: 'code', color: 'var(--primary)' },
    { name: 'STYLING', desc: 'Tailwind CSS, Vanilla SCSS', icon: 'layers', color: 'var(--secondary)' },
    { name: 'GRAPHICS', desc: 'Three.js, WebGL, GLSL', icon: 'view_in_ar', color: 'var(--tertiary)' },
    { name: 'MOTION', desc: 'Framer Motion, GSAP', icon: 'motion_photos_on', color: 'var(--primary)' },
    { name: 'BACKEND', desc: 'Node.js, PostgreSQL, Redis', icon: 'database', color: '#0055ff' },
    { name: 'DESIGN', desc: 'Figma, Blender 3D', icon: 'design_services', color: '#e31754' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: '40px' }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.5, y: 100, filter: 'blur(20px)', rotateX: 45 }}
          animate={{ opacity: 1, scale: 1.4, y: 0, filter: 'blur(0px)', rotateX: 0 }}
          exit={{ opacity: 0, scale: 2, y: -100, filter: 'blur(20px)', rotateX: -45 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="glass interactive"
          style={{ 
            position: 'absolute',
            width: '320px', 
            padding: '48px', 
            borderRadius: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.5)',
            zIndex: 10 
          }}
        >
          <div className="skill-icon-wrapper" style={{ backgroundColor: `${skills[activeIndex].color}15`, color: skills[activeIndex].color, width: '96px', height: '96px', borderRadius: '1.5rem', marginBottom: '24px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '4rem' }}>{skills[activeIndex].icon}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 className="skill-title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{skills[activeIndex].name}</h4>
            <p className="skill-desc" style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>{skills[activeIndex].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const projects = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrThMZrGJBUv8k4SCQ_Q2P1ezuztnZo83dsptChrYacrDLO9PwuS2SGOjAeR3Zm1ciKM2QVm6TWTrGR8j_AS6VASz6H-D4NMLu_A0OCLZ-E8Cg2O0_Ak_zZGyvICewrbvSEo_wr_A6XuFGeTVMMOab74YhXFGPWPBz_XxDmUiGM0P-OT8PxzbnHFp-zYljSeCZYOJ5Iz0uHSKsENFTL-FLLTWOiwhnEzWCnglTS3L8fG8x04UMJn97Jedoy5Hij5afKCsJgPsWMw",
      tags: ["CASE STUDY", "NEXT.JS"],
      title: "NEURAL ANALYTICA",
      desc: "Transforming complex AI data into intuitive, poetic visual narratives.",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7RE8KrmvvfvjVzLoPWt_rnJT11bjDAwWJ3FFV77mX47n1R-NoRL0QXwiQSQJPuvG0ufhNOUIn8cvQA9AMuqFicUjUShsuwQrv7i5ds7qHuFM9Tk6l_qDKp_3t9atFxOtsTvlBUXOWANY-tEea-RKPLV3hLXu3Cnc2bz0tPLgUMruN6WmwXbc9qbhvLVjh9kNqV46oRseCB83HQipZT03xFcPs9LQK1uXzgrB9efgYJurX7O2xENQPskQEm6ajHvW_7cv9aG09eQ",
      title: "VOID GALLERY",
      titleSize: "1.5rem",
      desc: "3D Interactive Art Portfolio",
      descSize: "0.875rem",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4C9RWy7b91XGTJMcrM0mDxY00H8v8dPyElgzKeSjMLeTYPWie16xljBNM1vxtIp9DGBVVBtEWRLCg7ZuRjAjBFrK0MC3EuiBseQ_4XHL--SfInI7ddaCjI08vvyokf9JvGOdiiiLC4Afk8HSXn_f41dkVG9hvC-POueAxdJU2qLESeyKdGKBClmfVqZcl8QuwLY2_vPPxHYHY6I2_1uCwerB2iPIKqAneliUdEsqDLQBgvhOYMZ30w51ojW4NhtgNef22_uUwyg",
      title: "COUTURE OS",
      titleSize: "1.25rem",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBorEGoTmRgCpImrRB0A77hgBhKONmBYReCwOC1pERsVcpvgvAKa9zEmqXUJdb3tM71CYoCrQNucJq3w1F1zuBsc3lFyr5zWTaO_Xglmt5d9ibqlYSp3dpl6JYgZart8YCCsk1k6H1KIDVbigP2eg1-sc82KJ5via1m_dvMOeGBJMSkf3dfpNUuac8PNdLp-ToAS6q6XH1sEaZ8BYYicSjtTDRllDZ-u7GIP8a53ohL25VwbdwK5D7YVPZ8qDTJ8op1F1kp43hdA",
      title: "QUANTUM CORE",
      titleSize: "1.25rem",
    }
  ];

  const experiences = [
    {
      active: true,
      date: "2021 — PRESENT",
      role: "Lead Frontend Architect",
      desc: "Directing technical strategy for high-end boutique agencies. Focused on performance optimization and modular design systems using Next.js and Three.js."
    },
    {
      active: false,
      date: "2018 — 2021",
      role: "Senior Creative Developer",
      desc: "Developed award-winning interactive marketing campaigns for global brands. Mastered WebGL, GLSL shaders, and sophisticated CSS animations."
    },
    {
      active: false,
      date: "2015 — 2018",
      role: "B.Sc. in Computer Science",
      desc: "Specialized in Graphics Engineering and UI/UX Principles. Graduated with Honors from the Royal Institute of Technology."
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          <div className="app-wrapper" style={{ overflow: 'hidden' }}>
            <NoiseOverlay />
            <Cursor />
            <AmbientLight />

            <header className="header" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
              <nav className="container header-nav">
                <a href="#" className="nav-logo interactive">CREATIVE.LAB</a>
                <div className="nav-links">
                  <a href="#experience" className="nav-link active interactive">Experience</a>
                  <a href="#projects" className="nav-link interactive">Projects</a>
                  <a href="#about" className="nav-link interactive">About</a>
                  <a href="#contact" className="nav-link interactive">Contact</a>
                </div>
                <Magnetic>
                  <button className="btn-primary interactive">Get in Touch</button>
                </Magnetic>
              </nav>
            </header>

            <main>
              {/* Hero Section */}
              <section className="section hero-section container">
                <div className="hero-grid">
                  <motion.div 
                    className="hero-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.div variants={fadeUp} className="status-badge glass">
                      AVAILABLE FOR FREELANCE
                    </motion.div>
                    
                    <motion.div variants={fadeUp} className="text-display-lg" style={{ lineHeight: 1.1 }}>
                      Engineering <br/>
                      <Typewriter 
                        phrases={['Poetic', 'Intelligent', 'Immersive', 'State-of-the-art']} 
                        className="italic text-primary" 
                      /> <br/>
                      Digital Experiences
                    </motion.div>

                    <motion.p variants={fadeUp} className="text-body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '500px' }}>
                      A Senior Creative Developer focused on building high-end interfaces that merge technical mastery with visual storytelling.
                    </motion.p>
                    <motion.div variants={fadeUp} className="hero-actions">
                      <Magnetic><button className="btn-primary interactive">View Showcase</button></Magnetic>
                      <Magnetic><button className="btn-outline interactive glass">About Me</button></Magnetic>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="hero-image-wrapper glass-edge glow-indigo"
                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 40, stiffness: 40, duration: 2, delay: 0.2 }}
                    whileHover={{ y: -10, transition: { type: 'spring', stiffness: 200 } }}
                  >
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt9O8vPn7-mLo7YHFXHpvxyeV_35j3IT4wxpN8VlWZ2_8C-0B4nVJVMBj4wta6UNoxS_NkSs9un3pmSI-Vdft2x-0yoOgF6zP9JXNoYTJNYpzuBwEZ1ks1rQnnjOYBLpS0Szp97mO6czQVty2bBwJRE4_ehhDhreu-IzlEBdIdsx-e-HUbKVwosN_AYsuHAM7I2ihVEDQxBkrEPBv32ZqbzqVYcWWoggKqTjP-5rgkULe4SaMzDEFYwLWx0hlw3tsscnUIURee9w" 
                      alt="Portrait" 
                      className="hero-image"
                    />
                    <div className="hero-quote glass interactive">
                      <p className="text-headline-md" style={{ fontSize: '1.25rem', fontStyle: 'italic' }}>
                        "Simplicity is the ultimate sophistication."
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0.6 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 2 }}
                >
                  <span className="text-label-md">Scroll to explore</span>
                  <motion.div 
                    style={{ width: '2px', height: '48px', background: 'linear-gradient(180deg, transparent, var(--primary), transparent)' }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              </section>

              {/* Experience Section */}
              <section id="experience" className="section about-section">
                <div className="container about-grid">
                  <div style={{ marginBottom: '32px' }}>
                    <TextReveal text="The Trajectory" className="text-headline-lg" style={{ marginBottom: '16px' }} />
                    <motion.p 
                      className="text-body-lg" 
                      style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      With over a decade of experience, I've bridged the gap between complex engineering and aesthetic design. My journey began in fine arts and evolved into the digital realm where I now craft high-performance web applications.
                    </motion.p>
                  </div>

                  <motion.div 
                    className="timeline"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                  >
                    <div className="timeline-line"></div>
                    {experiences.map((exp, idx) => (
                      <TimelineCard key={idx} experience={exp} />
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* Advanced 3D Circular Projects Section */}
              <CircularProjects projects={projects} />

              {/* Skills Section */}
              <section className="section skills-section">
                <div className="container" style={{ position: 'relative' }}>
                  <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <TextReveal text="The Arsenal" className="text-headline-lg" style={{ marginBottom: '16px', justifyContent: 'center' }} />
                    <motion.p 
                      className="text-body-lg" 
                      style={{ color: 'var(--on-surface-variant)' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      Modern tools for building the next generation of the web.
                    </motion.p>
                  </div>

                  <SkillsShowcase />
                </div>
              </section>

              {/* Contact CTA */}
              <section id="contact" className="section container">
                <motion.div 
                  className="contact-box glass-edge glow-indigo interactive"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                >
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 65, 200, 0.05)', zIndex: 0 }}></div>
                  <TextReveal 
                    text="Let's build something extraordinary together." 
                    className="text-display-lg" 
                    style={{ position: 'relative', zIndex: 10, marginBottom: '32px', justifyContent: 'center', textAlign: 'center' }} 
                  />
                  
                  <p className="text-body-lg" style={{ position: 'relative', zIndex: 10, color: 'var(--on-surface-variant)', maxWidth: '600px', margin: '0 auto 48px' }}>
                    Ready to elevate your digital presence? Whether it's a high-end application or a creative experiment, I'm here to bring it to life.
                  </p>
                  <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Magnetic><button className="btn-primary interactive" style={{ padding: '20px 48px' }}>Drop an Email</button></Magnetic>
                    <Magnetic><button className="btn-outline interactive glass" style={{ padding: '20px 48px' }}>Book a Call</button></Magnetic>
                  </div>
                </motion.div>
              </section>
            </main>

            <footer className="footer">
              <div className="container footer-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                  <span className="text-headline-md" style={{ fontSize: '1.5rem' }}>CREATIVE.LAB</span>
                  <p className="text-body-md" style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>© 2024 Creative Lab. Engineered for excellence.</p>
                  <LocalTime />
                </div>
                <div className="footer-links">
                  <a href="#" className="nav-link interactive">LinkedIn</a>
                  <a href="#" className="nav-link interactive">GitHub</a>
                  <a href="#" className="nav-link interactive">Dribbble</a>
                  <a href="#" className="nav-link interactive">Twitter</a>
                </div>
              </div>
            </footer>
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
