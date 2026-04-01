import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="error-page animate-in" style={{ padding: '4rem 2rem' }}>
      <div style={{ position: 'relative', height: '140px', marginBottom: '2rem' }}>
        <Ghost size={120} style={{ color: 'var(--primary)', opacity: 0.1, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }} />
        <h1 style={{ fontSize: '8rem', color: 'var(--primary)', position: 'relative', zIndex: 1, lineWeight: 900 }}>404</h1>
      </div>
      <h2>Oops! Page Not Found</h2>
      <p style={{ opacity: 0.6, margin: '1rem 0 2rem', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        <Home size={20} /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
