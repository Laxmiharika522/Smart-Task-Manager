import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, Circle, Edit3, Trash2, Save, X,
  Hash, Calendar, Flag, AlertTriangle, CheckCheck, Zap
} from 'lucide-react';

const PRIORITY_CONFIG = {
  high: { color: 'var(--priority-high)', bg: 'rgba(239,68,68,0.12)', icon: '🔴' },
  medium: { color: 'var(--priority-medium)', bg: 'rgba(245,158,11,0.12)', icon: '🟡' },
  low: { color: 'var(--priority-low)', bg: 'rgba(34,197,94,0.12)', icon: '🟢' },
};

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState('low');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const found = tasks.find(t => String(t.id) === String(userId));
    if (found) {
      setTask(found);
      setEditText(found.text);
      setEditPriority(found.priority);
    } else {
      setNotFound(true);
    }
  }, [userId]);

  const updateLocalStorage = (updatedTask) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updated = tasks.map(t => String(t.id) === String(userId) ? updatedTask : t);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    const updatedTask = { ...task, text: editText.trim(), priority: editPriority };
    updateLocalStorage(updatedTask);
    setTask(updatedTask);
    setIsEditing(false);
  };

  const handleToggleStatus = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateLocalStorage(updatedTask);
    setTask(updatedTask);
  };

  const handleDelete = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify(tasks.filter(t => String(t.id) !== String(userId))));
    navigate('/');
  };

  if (notFound) {
    return (
      <div className="animate-in" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <AlertTriangle size={64} style={{ color: 'var(--priority-high)', marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Task Not Found</h2>
        <p style={{ opacity: 0.6, marginBottom: '2rem' }}>This task may have been deleted.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  if (!task) return null;

  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.low;
  const createdDate = new Date(Number(userId));

  return (
    <div className="animate-in" style={{ maxWidth: '680px', margin: '0 auto', padding: '1rem 0 5rem' }}>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn"
        style={{ marginBottom: '1.5rem', padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      {/* ── Hero Card ─────────────────────────────── */}
      <div className="glass-card animate-pop" style={{
        marginBottom: '1.25rem',
        padding: '2rem',
        borderLeft: `4px solid ${priority.color}`,
        background: `linear-gradient(135deg, ${priority.bg} 0%, transparent 60%)`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blob */}
        <div style={{
          position: 'absolute', top: '-30px', right: '-30px',
          width: '140px', height: '140px', borderRadius: '50%',
          background: priority.color, opacity: 0.07, pointerEvents: 'none'
        }} />

        {/* Status + Priority badges */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{
            padding: '0.3rem 0.85rem', borderRadius: '999px', fontSize: '0.72rem',
            fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px',
            background: priority.bg, color: priority.color,
            border: `1px solid ${priority.color}55`
          }}>
            {priority.icon} {task.priority} Priority
          </span>
          <span style={{
            padding: '0.3rem 0.85rem', borderRadius: '999px', fontSize: '0.72rem',
            fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px',
            background: task.completed ? 'rgba(34,197,94,0.12)' : 'rgba(99,102,241,0.1)',
            color: task.completed ? 'var(--priority-low)' : 'var(--primary)',
            border: `1px solid ${task.completed ? 'rgba(34,197,94,0.35)' : 'rgba(99,102,241,0.3)'}`
          }}>
            {task.completed ? '✅ Completed' : '⏳ Pending'}
          </span>
        </div>

        {/* Task Title / Edit Input */}
        {isEditing ? (
          <>
            <input
              className="input"
              value={editText}
              onChange={e => setEditText(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSaveEdit()}
              style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}
            />
            {/* Priority Picker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.7 }}>Priority:</span>
              {['low', 'medium', 'high'].map(p => (
                <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input type="radio" name="edit-priority" value={p}
                    checked={editPriority === p} onChange={e => setEditPriority(e.target.value)}
                    style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }} />
                  <span style={{ textTransform: 'capitalize' }}>{p}</span>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleSaveEdit} className="btn btn-primary" style={{ flex: 1, fontSize: '0.9rem' }}>
                <Save size={16} /> Save Changes
              </button>
              <button onClick={() => { setIsEditing(false); setEditText(task.text); setEditPriority(task.priority); }}
                className="btn" style={{ flex: 1, fontSize: '0.9rem' }}>
                <X size={16} /> Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.7rem)', fontWeight: '800', lineHeight: 1.3,
              marginBottom: '1.5rem',
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.45 : 1,
            }}>
              {task.text}
            </h1>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={handleToggleStatus} className="btn btn-primary" style={{ flex: 1, minWidth: '140px', fontSize: '0.9rem' }}>
                {task.completed
                  ? <><Circle size={16} /> Mark Pending</>
                  : <><CheckCircle2 size={16} /> Mark Complete</>}
              </button>
              <button onClick={() => setIsEditing(true)} className="btn" style={{ flex: 1, minWidth: '100px', fontSize: '0.9rem' }}>
                <Edit3 size={16} /> Edit
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} className="btn"
                style={{ flex: 1, minWidth: '100px', fontSize: '0.9rem', color: 'var(--priority-high)', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Delete Confirmation ───────────────────── */}
      {showDeleteConfirm && (
        <div className="glass-card animate-pop" style={{
          marginBottom: '1.25rem', padding: '1.5rem',
          borderLeft: '4px solid var(--priority-high)',
          background: 'rgba(239,68,68,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <AlertTriangle size={22} style={{ color: 'var(--priority-high)' }} />
            <strong>Delete this task?</strong>
          </div>
          <p style={{ fontSize: '0.88rem', opacity: 0.65, marginBottom: '1rem' }}>
            This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleDelete} className="btn"
              style={{ flex: 1, background: 'var(--priority-high)', color: 'white', fontSize: '0.9rem' }}>
              <Trash2 size={16} /> Yes, Delete
            </button>
            <button onClick={() => setShowDeleteConfirm(false)} className="btn" style={{ flex: 1, fontSize: '0.9rem' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Info Cards Grid ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>

        {/* Task ID */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <Hash size={15} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', opacity: 0.6 }}>Task ID</span>
          </div>
          <p style={{ fontSize: '0.78rem', fontFamily: 'monospace', wordBreak: 'break-all', opacity: 0.8 }}>
            {userId}
          </p>
        </div>

        {/* Created Date */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <Calendar size={15} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', opacity: 0.6 }}>Created</span>
          </div>
          <p style={{ fontSize: '0.95rem', fontWeight: '700' }}>
            {createdDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
          <p style={{ fontSize: '0.78rem', opacity: 0.55 }}>
            {createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Priority */}
        <div className="glass-card" style={{ padding: '1.25rem', background: priority.bg }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <Flag size={15} style={{ color: priority.color }} />
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', opacity: 0.6 }}>Priority</span>
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: '800', color: priority.color, textTransform: 'capitalize' }}>
            {priority.icon} {task.priority}
          </p>
        </div>

        {/* Status */}
        <div className="glass-card" style={{
          padding: '1.25rem',
          background: task.completed ? 'rgba(34,197,94,0.08)' : 'rgba(99,102,241,0.07)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            {task.completed
              ? <CheckCheck size={15} style={{ color: 'var(--priority-low)' }} />
              : <Zap size={15} style={{ color: 'var(--primary)' }} />}
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', opacity: 0.6 }}>Status</span>
          </div>
          <p style={{ fontSize: '0.95rem', fontWeight: '800', color: task.completed ? 'var(--priority-low)' : 'var(--primary)' }}>
            {task.completed ? '✅ Completed' : '⏳ In Progress'}
          </p>
        </div>
      </div>


    </div>
  );
};

export default UserDetail;
