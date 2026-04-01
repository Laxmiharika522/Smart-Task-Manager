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

  // Statistics
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
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          Smart <span style={{ color: 'var(--primary)' }}>Task</span> Manager
        </h1>
        <p style={{ opacity: 0.6, fontSize: '1.1rem' }}>Organize your workflow with style and precision.</p>
      </header>

      {/* Stats Dashboard */}
      <div className="stat-grid">
        <div className="glass-card premium-border stat-card">
          <Target size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="glass-card premium-border stat-card">
          <Zap size={24} style={{ color: 'var(--priority-medium)', marginBottom: '0.5rem' }} />
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="glass-card premium-border stat-card">
          <Check size={24} style={{ color: 'var(--priority-low)', marginBottom: '0.5rem' }} />
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-label">Completion</div>
        </div>
      </div>

      <div className="glass-card premium-border" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleAddTask} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="input"
              placeholder="What's on your mind?..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ minWidth: '120px' }}>
              <Plus size={20} /> Add
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', opacity: 0.8 }}>Priority:</span>
            {['low', 'medium', 'high'].map(p => (
              <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span style={{ textTransform: 'capitalize' }}>{p}</span>
              </label>
            ))}
          </div>
        </form>
      </div>

      {/* Search and Filters */}
      <div className="glass-card premium-border" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
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
        
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', padding: '0.4rem', borderRadius: '0.8rem', gap: '0.25rem' }}>
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="btn"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                background: filter === f ? 'var(--primary)' : 'transparent',
                color: filter === f ? 'white' : 'inherit',
                borderRadius: '0.6rem',
                transition: 'all 0.2s'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="glass-card premium-border" style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
            <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
            <h3>Add a task</h3>
            <p>Start by typing in the box above.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`glass-card premium-border task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1 }}>
                <button
                  onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_TASK, payload: task.id })}
                  className="btn"
                  title={task.completed ? "Mark as Pending" : "Mark as Completed"}
                  style={{
                    padding: '0.4rem',
                    borderRadius: '50%',
                    background: task.completed ? 'var(--priority-low)' : 'rgba(99, 102, 241, 0.1)',
                    border: `2px solid ${task.completed ? 'var(--priority-low)' : 'var(--primary)'}`,
                    color: task.completed ? 'white' : 'var(--primary)',
                    boxShadow: task.completed ? 'none' : '0 0 10px rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <Check size={20} />
                </button>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                  {editingId === task.id ? (
                    <input
                      className="input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      onBlur={() => saveEdit(task.id)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                      style={{ padding: '0.5rem', margin: 0 }}
                    />
                  ) : (
                    <Link to={`/user/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{task.text}</span>
                    </Link>
                  )}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <PriorityBadge level={task.priority} />
                    <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                      <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                      {new Date(task.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
              
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {editingId === task.id ? (
                    <button onClick={() => saveEdit(task.id)} className="btn" style={{ padding: '0.5rem', color: 'var(--priority-low)' }}>
                      <Save size={20} />
                    </button>
                  ) : (
                    <>
                      {!task.completed && (
                        <button 
                          onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_TASK, payload: task.id })}
                          className="btn"
                          style={{ 
                            padding: '0.4rem 0.8rem', 
                            fontSize: '0.8rem', 
                            background: 'rgba(16, 185, 129, 0.1)', 
                            color: 'var(--priority-low)',
                            border: '1px solid rgba(16, 185, 129, 0.2)'
                          }}
                        >
                          Mark Done
                        </button>
                      )}
                      <button onClick={() => startEditing(task)} className="btn" style={{ padding: '0.5rem', opacity: 0.5 }}>
                        <Edit2 size={20} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: task.id })}
                    className="btn"
                    style={{ padding: '0.5rem', color: 'var(--priority-high)', opacity: 0.8 }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
            </div>
          ))
        )}
      </div>

      {filter === 'completed' && state.some(t => t.completed) && (
        <button
          onClick={() => dispatch({ type: ACTION_TYPES.CLEAR_COMPLETED })}
          className="btn"
          style={{ 
            marginTop: '2rem', 
            width: '100%', 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--priority-high)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}
        >
          <XCircle size={18} /> Clear All Completed Tasks
        </button>
      )}

      {filter === 'pending' && state.some(t => !t.completed) && (
        <button
          onClick={() => dispatch({ type: ACTION_TYPES.CLEAR_PENDING })}
          className="btn"
          style={{ 
            marginTop: '2rem', 
            width: '100%', 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--priority-high)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}
        >
          <XCircle size={18} /> Clear All Pending Tasks
        </button>
      )}
    </div>
  );
};

export default Home;
