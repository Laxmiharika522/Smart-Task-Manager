export const ACTION_TYPES = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  CLEAR_PENDING: 'CLEAR_PENDING',
};

export const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
      // Action payload now contains { text, priority }
      return [
        ...state, 
        { 
          id: Date.now(), 
          text: action.payload.text, 
          priority: action.payload.priority || 'low', 
          completed: false 
        }
      ];
    
    case ACTION_TYPES.TOGGLE_TASK:
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    
    case ACTION_TYPES.DELETE_TASK:
      return state.filter(task => task.id !== action.payload);

    case ACTION_TYPES.EDIT_TASK:
      return state.map(task =>
        task.id === action.payload.id ? { ...task, text: action.payload.text } : task
      );
    
    case ACTION_TYPES.CLEAR_COMPLETED:
      return state.filter(task => !task.completed);

    case ACTION_TYPES.CLEAR_PENDING:
      return state.filter(task => task.completed);
    
    default:
      return state;
  }
};
