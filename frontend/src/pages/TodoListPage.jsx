import { useState, useEffect } from 'react';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import { fetchTodos, createTodo, deleteTodo, toggleComplete } from '../services/todoService';
import './TodoListPage.css';

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('date-desc');
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, todoId: null });
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'info' });
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => { loadTodos(); }, []);
  useEffect(() => { applyFiltersAndSort(); }, [todos, searchTerm, filter, sort]);

  const loadTodos = async () => {
    try {
      setIsLoading(true); setError(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...todos];
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(todo => todo.title.toLowerCase().includes(lowerSearch) || todo.description.toLowerCase().includes(lowerSearch));
    }
    if (filter === 'completed') result = result.filter(todo => todo.completed);
    else if (filter === 'pending') result = result.filter(todo => !todo.completed);
    result.sort((a, b) => {
      if (sort === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'name-asc') return a.title.localeCompare(b.title);
      if (sort === 'name-desc') return b.title.localeCompare(a.title);
      return 0;
    });
    setFilteredTodos(result);
  };

  const handleAddTodo = async (formData) => {
    try {
      setIsFormLoading(true);
      const newTodo = await createTodo(formData);
      setTodos([...todos, newTodo]);
      showToast('Todo added successfully!', 'success');
    } catch (err) {
      showToast('Failed to add todo. Please try again.', 'error');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteClick = (todoId) => setConfirmDialog({ isOpen: true, todoId });

  const handleConfirmDelete = async () => {
    const { todoId } = confirmDialog;
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
      showToast('Todo deleted successfully!', 'success');
    } catch (err) {
      showToast('Failed to delete todo. Please try again.', 'error');
    } finally {
      setConfirmDialog({ isOpen: false, todoId: null });
    }
  };

  const handleToggleComplete = async (todoId, isCompleted) => {
    try {
      const updatedTodo = await toggleComplete(todoId, isCompleted);
      setTodos(todos.map(todo => todo.id === todoId ? updatedTodo : todo));
      showToast(updatedTodo.completed ? 'Marked as completed!' : 'Marked as pending!', 'success');
    } catch (err) {
      showToast('Failed to update todo status. Please try again.', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ isOpen: true, message, type });
    setTimeout(() => setToast({ isOpen: false, message: '', type: 'info' }), 3000);
  };

  return (
    <main className="todo-list-page">
      <div className="page-header">
        <h1 className="page-title">My Todos</h1>
        <p className="page-subtitle">Organize your tasks and boost your productivity</p>
      </div>
      <div className="page-content">
        <div className="form-section"><TodoForm onSubmit={handleAddTodo} isLoading={isFormLoading} /></div>
        <div className="todos-section">
          <SearchBar onSearch={setSearchTerm} />
          <FilterBar onFilterChange={setFilter} onSortChange={setSort} currentFilter={filter} currentSort={sort} />
          {isLoading ? <Loader /> : error ? (
            <div className="error-container">
              <p className="error-text">❌ {error}</p>
              <button className="btn-retry" onClick={loadTodos}>Retry</button>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h2 className="empty-title">{searchTerm || filter !== 'all' ? 'No todos found' : 'No todos yet'}</h2>
              <p className="empty-message">{searchTerm || filter !== 'all' ? 'Try adjusting your search or filters' : 'Add your first todo to get started'}</p>
            </div>
          ) : (
            <div className="todos-list">
              <div className="todos-count">Showing {filteredTodos.length} of {todos.length} todos</div>
              {filteredTodos.map(todo => (
                <TodoCard key={todo.id} todo={todo} onToggleComplete={handleToggleComplete} onDelete={handleDeleteClick} />
              ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmDialog isOpen={confirmDialog.isOpen} title="Delete Todo?" message="This action cannot be undone. Are you sure you want to delete this todo?" onConfirm={handleConfirmDelete} onCancel={() => setConfirmDialog({ isOpen: false, todoId: null })} confirmText="Delete" cancelText="Cancel" isDangerous={true} />
      {toast.isOpen && <Toast message={toast.message} type={toast.type} duration={3000} onClose={() => setToast({ ...toast, isOpen: false })} />}
    </main>
  );
}

export default TodoListPage;
