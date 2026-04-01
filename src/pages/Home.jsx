import React, { useReducer, useEffect, useState, useMemo } from 'react';
import { taskReducer, initialState, ACTION_TYPES } from '../reducers/taskReducer';
import { 
  Plus, Check, Trash2, XCircle, Edit2, Save, X, Search, 
  BarChart2, Zap, Target, AlertCircle, Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('low');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state));
  }, [state]);

  const stats = useMemo(() => {
    const total = state.length;
    const completed = state.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completionRate };
  }, [state]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: ACTION_TYPES.ADD_TASK, payload: { text, priority } });
      setText('');
      setPriority('low');
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      dispatch({ type: ACTION_TYPES.EDIT_TASK, payload: { id, text: editText } });
      setEditingId(null);
    }
  };

  const filteredTasks = state.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true : 
      filter === 'completed' ? task.completed : 
      !task.completed;
    return matchesSearch && matchesFilter;
  });

  const PriorityBadge = ({ level }) => (
    <span className={`badge badge-${level}`}>{level}</span>
  );

  return (
    <div className="animate-pop">
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '0.75rem' }}>
          Smart<span style={{ color: 'var(--primary)', position: 'relative' }}>
            Task
            <span style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '4px', background: 'var(--primary-glow)', borderRadius: '2px' }}></span>
          </span>
        </h1>
        <p style={{ opacity: 0.6, fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>Elevate your productivity with a premium workflow.</p>
      </header>

      <div className="stat-grid">
        <div className="glass-card stat-card">
          <Target size={22} style={{ color: 'var(--primary)', marginBottom: '0.4rem' }} />
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="glass-card stat-card">
          <Zap size={22} style={{ color: 'var(--priority-medium)', marginBottom: '0.4rem' }} />
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="glass-card stat-card">
          <Check size={22} style={{ color: 'var(--priority-low)', marginBottom: '0.4rem' }} />
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-label">Done</div>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
            <input
              type="text"
              className="input"
              placeholder="What needs to be done?..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={20} /> Add Task
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Priority:</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['low', 'medium', 'high'].map(p => (
                <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={priority === p}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                  />
                  <span style={{ textTransform: 'capitalize' }}>{p}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>


      <div className="glass-card" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
          <input
            type="text"
            className="input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '3rem' }}
          />
        </div>
        
        <div style={{ display: 'flex', background: 'rgba(99, 102, 241, 0.05)', padding: '0.4rem', borderRadius: '0.85rem', gap: '0.25rem', overflowX: 'auto' }}>
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="btn"
              style={{
                flex: 1,
                padding: '0.4rem 0.75rem',
                fontSize: '0.8rem',
                minHeight: '36px',
                background: filter === f ? 'var(--primary)' : 'transparent',
                color: filter === f ? 'white' : 'inherit',
                borderRadius: '0.6rem',
                boxShadow: filter === f ? '0 4px 10px var(--primary-glow)' : 'none'
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="task-list" style={{ paddingBottom: '2rem' }}>
        {filteredTasks.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', opacity: 0.5 }}>
            <AlertCircle size={40} style={{ marginBottom: '0.75rem', color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.1rem' }}>No tasks found</h3>
            <p style={{ fontSize: '0.9rem' }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`glass-card task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                <button
                  onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_TASK, payload: task.id })}
                  className="btn"
                  style={{
                    padding: 0,
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    minHeight: '32px',
                    borderRadius: '50%',
                    background: task.completed ? 'var(--priority-low)' : 'transparent',
                    border: `2px solid ${task.completed ? 'var(--priority-low)' : 'var(--primary)'}`,
                    color: task.completed ? 'white' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px'
                  }}
                >
                  {task.completed && <Check size={18} />}
                </button>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                  {editingId === task.id ? (
                    <input
                      className="input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      onBlur={() => saveEdit(task.id)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                      style={{ padding: '0.4rem 0.75rem', minHeight: '38px', fontSize: '1rem' }}
                    />
                  ) : (
                    <Link to={`/user/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <span style={{ 
                        fontSize: '1.05rem', 
                        fontWeight: '600', 
                        textDecoration: 'none',
                        opacity: task.completed ? 0.4 : 1
                      }}>
                        {task.text}
                      </span>
                    </Link>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <PriorityBadge level={task.priority} />
                    <span style={{ fontSize: '0.75rem', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={12} />
                      {new Date(task.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                {editingId === task.id ? (
                  <button onClick={() => saveEdit(task.id)} className="btn" style={{ minWidth: '44px', padding: '0.5rem', color: 'var(--priority-low)' }}>
                    <Save size={20} />
                  </button>
                ) : (
                  <>
                    <button onClick={() => startEditing(task)} className="btn" style={{ minWidth: '44px', padding: '0.5rem', opacity: 0.5 }}>
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: task.id })}
                      className="btn"
                      style={{ minWidth: '44px', padding: '0.5rem', color: 'var(--priority-high)', opacity: 0.8 }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filter === 'completed' && state.some(t => t.completed) && (
          <button
            onClick={() => dispatch({ type: ACTION_TYPES.CLEAR_COMPLETED })}
            className="btn"
            style={{ 
              width: '100%', 
              background: 'rgba(239, 68, 68, 0.08)', 
              color: 'var(--priority-high)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              fontSize: '0.9rem'
            }}
          >
            <XCircle size={18} /> Clear Completed
          </button>
        )}

        {filter === 'pending' && state.some(t => !t.completed) && (
          <button
            onClick={() => dispatch({ type: ACTION_TYPES.CLEAR_PENDING })}
            className="btn"
            style={{ 
              width: '100%', 
              background: 'rgba(239, 68, 68, 0.08)', 
              color: 'var(--priority-high)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              fontSize: '0.9rem'
            }}
          >
            <XCircle size={18} /> Clear Pending
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;