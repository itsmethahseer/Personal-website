import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const actualSkills = [
    'python', 'pytorch', 'tensorflow', 'scikit-learn', 'machine learning', 'deep learning',
    'react', 'node.js', 'fastapi', 'next.js', 'typescript', 'javascript', 'full stack',
    'pandas', 'numpy', 'spark', 'kafka', 'data engineering',
    'docker', 'kubernetes', 'mlflow', 'aws', 'mlops',
    'llms', 'langchain', 'rag', 'huggingface', 'generative ai',
    'postgresql', 'mongodb', 'pinecone', 'sql', 'nosql', 'databases'
];

const SkillMatcher = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSkills = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate API call/processing time for better UX
    setTimeout(() => {
      const text = inputText.toLowerCase();
      
      const matched = [];
      const missing = [];
      
      const commonTechSkills = ['react', 'angular', 'vue', 'python', 'java', 'c++', 'c#', 'javascript', 'typescript', 'aws', 'docker', 'kubernetes', 'node.js', 'sql', 'nosql', 'go', 'rust', 'pytorch', 'tensorflow', 'keras', 'scikit-learn', 'pandas', 'numpy', 'spark', 'kafka', 'mlflow', 'langchain', 'huggingface', 'fastapi', 'django', 'flask', 'gcp', 'azure'];
      
      // Simple matching against my actual skills
      actualSkills.forEach(skill => {
        // if text contains the skill word (checking simple boundaries)
        if (text.includes(skill.toLowerCase())) {
          matched.push(skill);
        }
      });

      // Simple mock for missing skills
      commonTechSkills.forEach(skill => {
        if (text.includes(skill) && !actualSkills.find(s => s.toLowerCase() === skill)) {
          missing.push(skill);
        }
      });
      
      // If no skills found at all, fallback percentage 0
      const matchPercentage = matched.length === 0 && missing.length === 0 ? 0 : 
                              (matched.length === 0 ? 0 : 
                               (missing.length === 0 ? 100 : 
                                Math.round((matched.length / (matched.length + missing.length)) * 100)));

      setResults({ matched, missing, percentage: matchPercentage });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="skill-matcher-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginTop: '64px' }}>
      <motion.div 
        className="glass"
        style={{ padding: '40px', borderRadius: '2rem', display: 'flex', flexDirection: 'column', gap: '24px', background: 'rgba(255, 255, 255, 0.7)' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3 className="text-headline-md" style={{ marginBottom: '8px' }}>Recruiter AI Match</h3>
          <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>Paste a job description to see how well my skills align with your role.</p>
        </div>

        <textarea 
          className="glass-input interactive"
          placeholder="Paste job description or required skills here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ 
            width: '100%', 
            minHeight: '150px', 
            background: 'rgba(255,255,255,0.5)', 
            border: '1px solid rgba(0,0,0,0.1)', 
            borderRadius: '1rem', 
            padding: '24px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            color: 'var(--on-surface)',
            boxSizing: 'border-box'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Magnetic>
            <button 
              className="btn-primary interactive" 
              onClick={analyzeSkills}
              disabled={isAnalyzing || !inputText.trim()}
              style={{ opacity: (isAnalyzing || !inputText.trim()) ? 0.7 : 1, padding: '16px 32px' }}
            >
              {isAnalyzing ? 'Analyzing Match...' : 'Analyze Match'}
            </button>
          </Magnetic>
        </div>

        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginTop: '16px' }}
            >
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>MATCH SCORE</span>
                    <span className="text-display-lg" style={{ color: results.percentage >= 70 ? 'var(--primary)' : (results.percentage >= 40 ? '#f59e0b' : '#ef4444') }}>
                      {results.percentage}%
                    </span>
                  </div>
                  <div style={{ flex: 1, height: '12px', background: 'rgba(0,0,0,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${results.percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{ height: '100%', background: results.percentage >= 70 ? 'var(--primary)' : (results.percentage >= 40 ? '#f59e0b' : '#ef4444') }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <h4 className="text-headline-sm" style={{ marginBottom: '16px', fontSize: '1.25rem', color: 'var(--primary)' }}>Matched Skills</h4>
                    {results.matched.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {results.matched.map((skill, idx) => (
                          <span key={idx} className="glass" style={{ padding: '8px 16px', borderRadius: '2rem', fontSize: '0.875rem', textTransform: 'capitalize', background: 'rgba(0, 65, 200, 0.1)', border: '1px solid rgba(0, 65, 200, 0.2)' }}>
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>No specific matches identified.</p>
                    )}
                  </div>

                  {results.missing.length > 0 && (
                    <div style={{ flex: '1 1 300px' }}>
                      <h4 className="text-headline-sm" style={{ marginBottom: '16px', fontSize: '1.25rem', color: '#ef4444' }}>Missing Skills</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {results.missing.map((skill, idx) => (
                          <span key={idx} className="glass" style={{ padding: '8px 16px', borderRadius: '2rem', fontSize: '0.875rem', textTransform: 'capitalize', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            × {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SkillMatcher;
