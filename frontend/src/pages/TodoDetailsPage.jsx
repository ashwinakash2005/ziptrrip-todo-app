import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import Loader from '../components/Loader';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import { fetchTodoById, updateTodo, deleteTodo } from '../services/todoService';
import './TodoDetailsPage.css';

function TodoDetailsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const todoId = searchParams.get('id');
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'info' });
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    if (!todoId) { setError('No todo ID provided'); setIsLoading(false); return; }
    loadTodo();
  }, [todoId]);

  const loadTodo = async () => {
    try {
      setIsLoading(true); setError(null);
      const data = await fetchTodoById(todoId);
      setTodo(data);
    } catch (err) {
      setError('Failed to load todo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTodo = async (formData) => {
    try {
      setIsFormLoading(true);
      const updatedTodo = await updateTodo(todoId, formData);
      setTodo(updatedTodo); setIsEditing(false);
      showToast('Todo updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to update todo. Please try again.', 'error');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTodo(todoId);
      showToast('Todo deleted successfully!', 'success');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      showToast('Failed to delete todo. Please try again.', 'error');
    } finally {
      setConfirmDialog(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ isOpen: true, message, type });
    setTimeout(() => setToast({ isOpen: false, message: '', type: 'info' }), 3000);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const getPriorityColor = (priority) => ({ high: 'priority-high', medium: 'priority-medium', low: 'priority-low' }[priority] || 'priority-low');
  const getCategoryIcon = (category) => ({ work: '💼', personal: '👤', shopping: '🛒', health: '❤️', other: '📌' }[category] || '📌');

  if (isLoading) return <Loader />;
  if (error || !todo) return (
    <main className="todo-details-page">
      <div className="error-container">
        <p className="error-text">❌ {error || 'Todo not found'}</p>
        <button className="btn-back" onClick={() => navigate('/')}>← Back to Todos</button>
      </div>
    </main>
  );

  return (
    <main className="todo-details-page">
      <button className="btn-back" onClick={() => navigate('/')}>← Back to Todos</button>
      <div className="details-container">
        {!isEditing ? (
          <div className="todo-details">
            <div className="details-header">
              <div>
                <h1 className="details-title">{todo.title}</h1>
                <p className="details-status">{todo.completed ? '✓ Completed' : '○ Pending'}</p>
              </div>
              <div className="details-badges">
                <span className={`priority-badge ${getPriorityColor(todo.priority)}`}>{todo.priority}</span>
                <span className="category-badge">{getCategoryIcon(todo.category)} {todo.category}</span>
              </div>
            </div>
            <div className="details-section">
              <h3 className="section-title">Description</h3>
              <p className="section-content">{todo.description}</p>
            </div>
            <div className="details-section">
              <h3 className="section-title">Timestamps</h3>
              <div className="timestamps">
                <div className="timestamp-item"><span className="timestamp-label">Created:</span><span className="timestamp-value">{formatDate(todo.createdAt)}</span></div>
                <div className="timestamp-item"><span className="timestamp-label">Last Updated:</span><span className="timestamp-value">{formatDate(todo.updatedAt)}</span></div>
              </div>
            </div>
            <div className="details-actions">
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>✏️ Edit</button>
              <button className="btn btn-danger" onClick={() => setConfirmDialog(true)}>🗑️ Delete</button>
            </div>
          </div>
        ) : (
          <div className="edit-section">
            <h2 className="edit-title">Edit Todo</h2>
            <TodoForm onSubmit={handleUpdateTodo} initialData={todo} isLoading={isFormLoading} />
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)} disabled={isFormLoading}>✕ Cancel</button>
          </div>
        )}
      </div>
      <ConfirmDialog isOpen={confirmDialog} title="Delete Todo?" message="This action cannot be undone. Are you sure you want to delete this todo?" onConfirm={handleConfirmDelete} onCancel={() => setConfirmDialog(false)} confirmText="Delete" cancelText="Cancel" isDangerous={true} />
      {toast.isOpen && <Toast message={toast.message} type={toast.type} duration={3000} onClose={() => setToast({ ...toast, isOpen: false })} />}
    </main>
  );
}

export default TodoDetailsPage;
