import { Link } from 'react-router-dom';
import './TodoCard.css';

function TodoCard({ todo, onToggleComplete, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-low';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = { work: '💼', personal: '👤', shopping: '🛒', health: '❤️', other: '📌' };
    return icons[category] || '📌';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-card-header">
        <div className="todo-card-left">
          <input type="checkbox" className="todo-checkbox" checked={todo.completed}
            onChange={() => onToggleComplete(todo.id, todo.completed)}
            aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`} />
          <div className="todo-card-info">
            <h3 className="todo-title">{todo.title}</h3>
            <p className="todo-description">{todo.description}</p>
          </div>
        </div>
        <div className="todo-card-meta">
          <span className={`priority-badge ${getPriorityColor(todo.priority)}`}>{todo.priority}</span>
          <span className="category-badge">{getCategoryIcon(todo.category)} {todo.category}</span>
        </div>
      </div>
      <div className="todo-card-footer">
        <span className="todo-date">📅 {formatDate(todo.createdAt)}</span>
        <div className="todo-actions">
          <Link to={`/todo?id=${todo.id}`} className="btn btn-view">View</Link>
          <button className="btn btn-delete" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.title}`}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
