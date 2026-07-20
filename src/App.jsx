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
import SkillMatcher from './components/SkillMatcher';
import './App.css';
import './components/Enhancements.css';
import portrait from './assets/IMG_5069.jpeg';

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
    { name: 'AGENTIC AI', desc: 'LangChain, LangGraph, Strands', icon: 'smart_toy', color: 'var(--primary)' },
    { name: 'LLMs & RAG', desc: 'OpenAI, Claude, Llama2, FAISS, Chroma', icon: 'psychology', color: 'var(--secondary)' },
    { name: 'COMPUTER VISION', desc: 'YOLO, PaddleOCR, Donut, OpenCV', icon: 'remove_red_eye', color: 'var(--tertiary)' },
    { name: 'DEPLOYMENT', desc: 'FastAPI, Docker, AWS, Azure', icon: 'cloud', color: '#0055ff' },
    { name: 'NLP & SPEECH', desc: 'Whisper, Gliner, NER, ElevenLabs', icon: 'record_voice_over', color: '#e31754' },
    { name: 'DATA & ML', desc: 'PyTorch, TensorFlow, Scikit-learn, Pandas', icon: 'analytics', color: 'var(--primary)' },
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

const SplashSection = () => {
  const name = "THAHSEER";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const containerScale   = useTransform(scrollYProgress, [0, 0.75], [1, 0.9]);
  const containerY       = useTransform(scrollYProgress, [0, 0.75], [0, -60]);
  const hintOp           = useTransform(scrollYProgress, [0, 0.3],  [1, 0]);

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90, filter: 'blur(12px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + i * 0.07,
        type: 'spring',
        damping: 14,
        stiffness: 90,
      },
    }),
  };

  return (
    <section ref={ref} style={{ height: '100vh', position: 'relative', zIndex: 5 }}>
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: containerOpacity,
          pointerEvents: 'none',
          perspective: '1200px',
          overflow: 'hidden',
        }}
      >
        {/* Animated glow orb behind name */}
        <motion.div
          style={{
            position: 'absolute',
            width: '70vw',
            height: '50vh',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: 0.12,
            zIndex: 0,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Secondary accent orb */}
        <motion.div
          style={{
            position: 'absolute',
            width: '40vw',
            height: '30vh',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.08,
            zIndex: 0,
            transform: 'translateX(20vw) translateY(10vh)',
          }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Main name with letter-by-letter animation */}
        <motion.div
          style={{ y: containerY, scale: containerScale, position: 'relative', zIndex: 1 }}
        >
          <div style={{ display: 'flex', perspective: '1000px', transformStyle: 'preserve-3d' }}>
            {name.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(3rem, 14vw, 13rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  background: 'linear-gradient(160deg, var(--on-surface) 0%, var(--primary) 55%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transformStyle: 'preserve-3d',
                  userSelect: 'none',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle line — fades in after letters settle */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.0, duration: 0.9, ease: 'easeOut' }}
            style={{
              textAlign: 'center',
              fontSize: '0.9rem',
              letterSpacing: '0.35em',
              color: 'var(--on-surface-variant)',
              fontFamily: 'var(--font-label)',
              fontWeight: 500,
              marginTop: '20px',
            }}
          >
            AI ENGINEER · MALAPPURAM, INDIA
          </motion.p>
        </motion.div>

        {/* Scroll hint — appears last, fades on scroll */}
        <motion.div
          style={{
            opacity: hintOp,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            position: 'absolute',
            bottom: '52px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <p style={{
            fontSize: '0.72rem',
            letterSpacing: '0.28em',
            color: 'var(--on-surface-variant)',
            fontFamily: 'var(--font-label)',
            fontWeight: 600,
          }}>
            SCROLL DOWN FOR DETAILS
          </p>
          <motion.div
            style={{
              width: '2px',
              height: '48px',
              background: 'linear-gradient(180deg, var(--primary), transparent)',
            }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      // IST = UTC+5:30
      const now = new Date();
      const istOffset = 5.5 * 60; // minutes
      const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
      const istMinutes = (utcMinutes + istOffset) % (24 * 60);
      const istHour = istMinutes / 60;
      setIsAvailable(istHour >= 10 && istHour < 19); // 10AM to 7PM IST
    };
    checkAvailability();
    const timer = setInterval(checkAvailability, 60000); // check every minute
    return () => clearInterval(timer);
  }, []);


  const projects = [
    {
      img: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&auto=format&fit=crop",
      tags: ["FASTAPI", "LLMs", "SPEECH-TO-TEXT"],
      title: "MEETING NOTETAKER",
      desc: "AI-powered meeting notetaker (Vica) with automated transcription, summarization, and action item extraction using Playwright & Rust APIs.",
    },
    {
      img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
      tags: ["STRANDS", "AWS BEDROCK", "ELEVENLABS"],
      title: "INSURANCE ELIGIBILITY AI",
      titleSize: "1.25rem",
      desc: "Agentic AI voice automation for insurance eligibility with multi-step reasoning using Strands, Bedrock & AWS Connect.",
      descSize: "0.875rem",
    },
    {
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
      tags: ["LANGGRAPH", "CLAUDE 3", "DOCKER"],
      title: "CHAT PLUGIN",
      titleSize: "1.5rem",
      desc: "AI chat plugin for patient management enabling doctors to navigate via natural language queries.",
      descSize: "0.875rem",
    },
    {
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
      tags: ["GPT-4", "FASTAPI", "OCR"],
      title: "INVOICE PARSER",
      titleSize: "1.25rem",
      desc: "Structured JSON extraction from invoices using GPT-4o, Gemini, AWS Textract & chain-of-thought prompting.",
      descSize: "0.875rem",
    },
    {
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
      tags: ["LLAMA2", "LANGCHAIN", "RAG"],
      title: "WHIZZ.AI",
      titleSize: "1.5rem",
      desc: "Document-based chat app using Llama2, OpenAI, LangChain, FAISS, Whisper & ChromaDB with RAG prompting for Q&A over uploaded datasets.",
      descSize: "0.875rem",
    },
  ];


  const experiences = [
    {
      active: true,
      date: "OCT 2025 — PRESENT",
      role: "AI Engineer · Equipo Health",
      desc: "Built an AI chat plugin using LangGraph & Claude 3 for patient management. Developed an Automatic AI calling system for insurance eligibility checks. Built multi-agent systems with Strands & Bedrock for real-time collaboration.",
      icon: "work"
    },
    {
      active: false,
      date: "APR 2024 — JUN 2025",
      role: "AI Developer · Pixl.ai",
      desc: "Built computer vision pipelines with YOLO, PaddleOCR & Donut. Fine-tuned LLMs (Llama2, TinyLlama) for chatbots. Worked with Gliner for NER and built a meeting-scheduling chatbot assistant."
    },
    {
      active: false,
      date: "NOV 2023 — APR 2024",
      role: "AI/ML Trainee · Cubet Technolabs",
      desc: "Worked on LLM-powered document-based Q&A application. Implemented audio recognition with Whisper. Used FAISS, OpenAI, Llama2, LangChain & FastAPI for deployment."
    },
    {
      active: false,
      date: "NOV 2023 — APR 2024",
      role: "AI/ML Trainee · Brototype",
      desc: "Worked on classification, regression & deep learning. Developed self-projects in image captioning & next-word prediction. Performed EDA on various datasets."
    },
    {
      active: false,
      date: "JUN 2019 — MAR 2023",
      role: "BSc Mathematics · Calicut University",
      desc: "Bachelor of Science in Mathematics from Calicut University. Built a strong foundation in statistical analysis, quantitative reasoning, and data structures — the base of my AI/ML journey.",
      icon: "school"
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
                <a href="#" className="nav-logo interactive">THAHSEER</a>
                <div className="nav-links">
                  <a href="#experience" className="nav-link active interactive">Experience</a>
                  <a href="#projects" className="nav-link interactive">Projects</a>
                  <a href="#experience" className="nav-link interactive">About</a>
                  <a href="#contact" className="nav-link interactive">Contact</a>
                </div>
                <Magnetic>
                  <a href="#contact" className="btn-primary interactive" style={{ textDecoration: 'none' }}>Get in Touch</a>
                </Magnetic>
              </nav>
            </header>

            <main>
              <SplashSection />

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
                    <motion.div
                      variants={fadeUp}
                      className="status-badge glass"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderColor: isAvailable ? 'rgba(0,200,100,0.3)' : 'rgba(220,50,50,0.3)',
                        background: isAvailable ? 'rgba(0,200,100,0.08)' : 'rgba(220,50,50,0.08)'
                      }}
                    >
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isAvailable ? '#00c864' : '#e03030',
                        boxShadow: isAvailable ? '0 0 8px #00c864' : '0 0 8px #e03030',
                        animation: isAvailable ? 'pulse-dot 2s infinite' : 'none',
                        flexShrink: 0,
                      }} />
                      <span>
                        {isAvailable
                          ? 'AVAILABLE FOR FREELANCE · 10AM – 7PM IST'
                          : 'UNAVAILABLE NOW · OPEN 10AM – 7PM IST'
                        }
                      </span>
                    </motion.div>
                    
                    <motion.div variants={fadeUp} className="text-display-lg" style={{ lineHeight: 1.1 }}>
                      Building <br/>
                      <Typewriter 
                        phrases={['Agentic AI', 'LLM Systems', 'RAG Pipelines', 'AI Automation','Classical ML','Data Engineering','Production-Ready AI']} 
                        className="italic text-primary" 
                      /> <br/>
                      for the Real World
                    </motion.div>

                    <motion.p variants={fadeUp} className="text-body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '500px' }}>
                      AI Engineer with 3 years of experience building LLM-powered applications, agentic AI systems, and computer vision pipelines. Skilled in RAG, vector databases, and deploying ML models with FastAPI & Docker on cloud platforms.
                    </motion.p>
                    <motion.div variants={fadeUp} className="hero-actions">
                      <Magnetic><a href="#experience" className="btn-primary interactive" style={{ textDecoration: 'none' }}>View Showcase</a></Magnetic>
                      <Magnetic><a href="/resume.pdf" download="Resume.pdf" className="btn-outline interactive glass" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Download Resume</a></Magnetic>
                      <Magnetic><a href="#experience" className="btn-outline interactive glass" style={{ textDecoration: 'none' }}>About Me</a></Magnetic>
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
                      src={portrait} 
                      alt="Portrait" 
                      className="hero-image"
                    />
                    <div className="hero-quote glass interactive">
                      <p className="text-headline-md" style={{ fontSize: '1.25rem', fontStyle: 'italic' }}>
                        "AI is not magic — it's engineering."
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
                      AI Engineer with 3 years of hands-on experience across LLM applications, agentic systems, and computer vision. From document Q&A to voice AI automation — I build systems that actually work in production.
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
                    <TextReveal text="Tech DNA" className="text-headline-lg" style={{ marginBottom: '16px', justifyContent: 'center' }} />
                    <motion.p 
                      className="text-body-lg" 
                      style={{ color: 'var(--on-surface-variant)' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      A full stack of AI capabilities — from model training to cloud deployment.
                    </motion.p>
                  </div>

                  <SkillsShowcase />
                  <SkillMatcher />
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
                    text="Let's build something intelligent together." 
                    className="text-display-lg" 
                    style={{ position: 'relative', zIndex: 10, marginBottom: '32px', justifyContent: 'center', textAlign: 'center' }} 
                  />
                  
                  <p className="text-body-lg" style={{ position: 'relative', zIndex: 10, color: 'var(--on-surface-variant)', maxWidth: '600px', margin: '0 auto 16px' }}>
                    Have an AI project in mind? From LLM-powered apps to agentic systems — I'm available for freelance work. Let's connect.
                  </p>
                  <p className="text-body-lg" style={{ position: 'relative', zIndex: 10, color: 'var(--on-surface-variant)', maxWidth: '600px', margin: '0 auto 48px', opacity: 0.7 }}>
                    📧 zacthahseer123@gmail.com &nbsp;|&nbsp; 📞 +91 7592072319
                  </p>
                  <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Magnetic><a href="mailto:zacthahseer123@gmail.com" className="btn-primary interactive" style={{ padding: '20px 48px', textDecoration: 'none' }}>Send an Email</a></Magnetic>
                    <Magnetic><a href="https://wa.me/917592072319" target="_blank" rel="noreferrer" className="btn-outline interactive glass" style={{ padding: '20px 48px', textDecoration: 'none' }}>WhatsApp Me</a></Magnetic>
                  </div>
                </motion.div>
              </section>
            </main>

            <footer className="footer">
              <div className="container footer-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                  <span className="text-headline-md" style={{ fontSize: '1.5rem' }}>Thank You for reaching out</span>
                  <p className="text-body-md" style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>© 2025 Muhammed Thahseer. AI Engineer · Malappuram, Kerala, India.</p>
                  <LocalTime />
                </div>
                <div className="footer-links">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="nav-link interactive">LinkedIn</a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link interactive">GitHub</a>
                  <a href="mailto:zacthahseer123@gmail.com" className="nav-link interactive">Email</a>
                  <a href="tel:+917592072319" className="nav-link interactive">Phone</a>
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
