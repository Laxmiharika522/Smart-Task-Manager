import React from 'react';
import { Info, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-in" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About SmartTask</h1>
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
          SmartTask is a modern, responsive task management application built with React, 
          leveraging the latest features like <strong>Context API</strong> for theme switching 
          and <strong>useReducer</strong> for robust state management.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '3rem' }}>
          <div className="glass-card premium-border" style={{ textAlign: 'center', padding: '2rem' }}>
            <Zap size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Blazing Fast</h3>
            <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>Built with Vite for near-instant development and optimized production builds.</p>
          </div>
          <div className="glass-card premium-border" style={{ textAlign: 'center', padding: '2rem' }}>
            <ShieldCheck size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Secure State</h3>
            <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>Uses useReducer to ensure predictable and traceable state transitions.</p>
          </div>
          <div className="glass-card premium-border" style={{ textAlign: 'center', padding: '2rem' }}>
            <Info size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Persistent</h3>
            <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>Automatically saves your tasks and theme preferences to local storage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
