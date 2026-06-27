import React from 'react';
import {
  Info, ShieldCheck, Zap, Layout, Moon, Sun, ListTodo,
  BarChart2, Search, Tag, GitBranch, Globe, BookOpen, Code2
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <ListTodo size={24} />,
      title: 'Task Management',
      desc: 'Add, edit, delete and toggle tasks with full CRUD support and inline editing.',
    },
    {
      icon: <Tag size={24} />,
      title: 'Priority Levels',
      desc: 'Tag every task as High, Medium or Low priority with colour-coded badges.',
    },
    {
      icon: <Search size={24} />,
      title: 'Search & Filter',
      desc: 'Instantly search tasks by name and filter between All, Pending and Completed.',
    },
    {
      icon: <BarChart2 size={24} />,
      title: 'Live Stats Dashboard',
      desc: 'Real-time counters for Total, Pending tasks and overall Completion Rate.',
    },
    {
      icon: <Moon size={24} />,
      title: 'Light / Dark Theme',
      desc: 'Global theme toggle powered by useContext, persisted across sessions.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Persistent Storage',
      desc: 'All tasks and theme preferences are saved automatically in localStorage.',
    },
  ];

  const techStack = [
    { label: 'React 19', desc: 'UI Framework' },
    { label: 'Vite 8', desc: 'Build Tool' },
    { label: 'React Router v7', desc: 'Client-side Routing' },
    { label: 'useReducer', desc: 'State Management' },
    { label: 'useContext', desc: 'Global Theme' },
    { label: 'localStorage', desc: 'Data Persistence' },
    { label: 'Lucide React', desc: 'Icon Library' },
    { label: 'Vercel', desc: 'Deployment' },
  ];

  const concepts = [
    {
      icon: <Code2 size={22} />,
      title: 'Advanced React Hooks',
      points: [
        'useContext — global Light/Dark theme provider',
        'useReducer — 6 action types for task state',
        'useState, useMemo, useEffect throughout',
      ],
    },
    {
      icon: <GitBranch size={22} />,
      title: 'React Router Navigation',
      points: [
        'BrowserRouter with Routes & NavLink',
        'Dynamic route /user/:id with useParams()',
        '404 Not Found wildcard route',
      ],
    },
    {
      icon: <Globe size={22} />,
      title: 'Deployment',
      points: [
        'Production build via npm run build',
        'Deployed on Vercel with vercel.json SPA config',
        'Live URL accessible from any device',
      ],
    },
  ];

  return (
    <div className="animate-pop" style={{ paddingBottom: '4rem' }}>

      {/* ── Hero ───────────────────────────────── */}
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.4rem 1.1rem', borderRadius: '999px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
          marginBottom: '1rem', fontSize: '0.82rem', fontWeight: '700',
          color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px'
        }}>
          <Info size={14} /> About This Project
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 7vw, 3rem)', fontWeight: '800',
          lineHeight: 1.15, marginBottom: '1rem'
        }}>
          Smart<span style={{ color: 'var(--primary)' }}>Task</span> Manager
        </h1>
        <p style={{
          opacity: 0.65, fontSize: '1rem', maxWidth: '520px',
          margin: '0 auto', lineHeight: '1.7'
        }}>
          A modern, full-featured task management application built with <strong>React + Vite</strong>,
          demonstrating advanced React concepts including Hooks, Context API, Reducer-based state,
          and client-side routing — deployed live on Vercel.
        </p>
      </header>

      {/* ── Features Grid ──────────────────────── */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layout size={20} style={{ color: 'var(--primary)' }} /> Key Features
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.4rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.4rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.65, lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core Concepts ───────────────────────── */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} style={{ color: 'var(--primary)' }} /> Core Concepts
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {concepts.map((c, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                {c.icon}
                <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>{c.title}</h3>
              </div>
              <ul style={{ paddingLeft: '1.1rem', margin: 0 }}>
                {c.points.map((pt, j) => (
                  <li key={j} style={{ fontSize: '0.85rem', opacity: 0.72, lineHeight: '1.8' }}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ──────────────────────────── */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={20} style={{ color: 'var(--primary)' }} /> Tech Stack
        </h2>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {techStack.map((t, i) => (
              <div key={i} style={{
                padding: '0.5rem 1rem', borderRadius: '0.75rem',
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
                minWidth: '90px', textAlign: 'center'
              }}>
                <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary)' }}>{t.label}</span>
                <span style={{ fontSize: '0.72rem', opacity: 0.55 }}>{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Info Card ───────────────────── */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, transparent 100%)',
        borderLeft: '4px solid var(--primary)',
        display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <p style={{ fontWeight: '700', marginBottom: '0.25rem' }}>📁 Project</p>
          <p style={{ opacity: 0.65, fontSize: '0.9rem' }}>Smart Task Manager — React Web App</p>
        </div>
        <div>
          <p style={{ fontWeight: '700', marginBottom: '0.25rem' }}>🛠️ Build Tool</p>
          <p style={{ opacity: 0.65, fontSize: '0.9rem' }}>Vite + React</p>
        </div>
        <div>
          <p style={{ fontWeight: '700', marginBottom: '0.25rem' }}>🚀 Deployed</p>
          <p style={{ opacity: 0.65, fontSize: '0.9rem' }}>Vercel (Live)</p>
        </div>
        <div>
          <p style={{ fontWeight: '700', marginBottom: '0.25rem' }}>📦 Version</p>
          <p style={{ opacity: 0.65, fontSize: '0.9rem' }}>React 19 / Router v7</p>
        </div>
      </div>

    </div>
  );
};

export default About;
