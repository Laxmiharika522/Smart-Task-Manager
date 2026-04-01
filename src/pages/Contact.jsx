import React, { useState } from 'react';
import { Mail, Send, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-in" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Get in Touch</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card premium-border" style={{ padding: '2rem' }}>
          <h2>Contact Info</h2>
          <p style={{ margin: '1.5rem 0', opacity: 0.8 }}>Feel free to reach out to us for any feedback or feature requests.</p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Mail size={20} style={{ color: 'var(--primary)' }} />
              <span>support@smartTask.com</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Phone size={20} style={{ color: 'var(--primary)' }} />
              <span>+91 98876 82341</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <MapPin size={20} style={{ color: 'var(--primary)' }} />
              <span>Chennai TamilNadu</span>
            </div>
          </div>
        </div>

        <div className="glass-card premium-border" style={{ padding: '2rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Send size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. We will get back to you soon.</p>
              <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                <input type="text" className="input" placeholder="Your name" required />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                <input type="email" className="input" placeholder="Your email" required />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                <textarea className="input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="How can we help?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                <Send size={20} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
