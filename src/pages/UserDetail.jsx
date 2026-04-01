import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="animate-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>
        <ArrowLeft size={18} /> Back
      </button>
      
      <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <User size={40} />
        </div>
        
        <h1 style={{ marginBottom: '0.5rem' }}>Task Details</h1>
        <p style={{ opacity: 0.6, marginBottom: '2rem' }}>ID: {userId}</p>
        
        <div style={{ display: 'grid', gap: '1.5rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Calendar size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <span style={{ fontWeight: '600' }}>Created on:</span>
              <p style={{ opacity: 0.8 }}>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Tag size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <span style={{ fontWeight: '600' }}>Category:</span>
              <p style={{ opacity: 0.8 }}>General</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '2.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', border: '1px solid var(--primary)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '500' }}>
            This is a dynamic detail page demonstrating how to extract parameters from the URL using the useParams hook.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
