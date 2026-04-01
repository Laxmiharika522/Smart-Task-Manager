import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Layout, Info, Mail, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const NavContent = () => (
    <>
      <li>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="top-bar">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          <Layout size={22} />
          SmartTask
        </div>
        <button onClick={toggleTheme} className="btn" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', minHeight: '40px', minWidth: '40px' }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <nav className="nav-desktop">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          <Layout size={24} />
          SmartTask
        </div>
        <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          <NavContent />
        </ul>
        <button onClick={toggleTheme} className="btn" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <nav className="mobile-nav">
        <NavLink to="/" end className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <Home size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <Info size={24} />
          <span>About</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <Mail size={24} />
          <span>Contact</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;

