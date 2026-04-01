import React, { useState } from 'react';
import { Mail, Send, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-pop">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '800' }}>Get in Touch</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Info</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.7, fontSize: '0.95rem' }}>Feel free to reach out to us for any feedback or feature requests.</p>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem' }}>
                <Mail size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <span style={{ fontSize: '0.95rem' }}>support@smartTask.com</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem' }}>
                <Phone size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <span style={{ fontSize: '0.95rem' }}>+91 12345 12345</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem' }}>
                <MapPin size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <span style={{ fontSize: '0.95rem' }}>Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ 
                width: '64px', height: '64px', 
                background: 'rgba(16, 185, 129, 0.1)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Send size={32} style={{ color: 'var(--priority-low)' }} />
              </div>
              <h2 style={{ marginBottom: '0.5rem' }}>Message Sent!</h2>
              <p style={{ opacity: 0.7 }}>Thank you for reaching out. We'll get back to you soon.</p>
              <button className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }} onClick={() => setSubmitted(false)}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Name</label>
                <input type="text" className="input" placeholder="Your name" required />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Email</label>
                <input type="email" className="input" placeholder="Your email" required />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Message</label>
                <textarea className="input" style={{ minHeight: '100px', resize: 'vertical' }} placeholder="How can we help?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
