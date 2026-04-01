import React from 'react';
import { Info, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-pop">
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2.5rem', fontWeight: '800' }}>About SmartTask</h1>
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <p style={{ marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.1rem', opacity: 0.8 }}>
          SmartTask is a modern, responsive task management application built with React, 
          leveraging the latest features like <strong>Context API</strong> for theme switching 
          and <strong>useReducer</strong> for robust state management.
        </p>
        <div className="stat-grid" style={{ marginTop: '2rem' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <Zap size={28} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Blazing Fast</h3>
            <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>Built with Vite for near-instant development and optimized production.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <ShieldCheck size={28} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Secure State</h3>
            <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>Uses useReducer to ensure predictable and traceable transitions.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <Info size={28} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Persistent</h3>
            <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>Automatically saves your tasks and preferences to local storage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
