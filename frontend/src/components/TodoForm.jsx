import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onSubmit, initialData = null, isLoading = false }) {
  const [formData, setFormData] = useState(initialData || { title: '', description: '', priority: 'medium', category: 'personal' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.trim().length === 0) newErrors.title = 'Title is required';
    if (!formData.description || formData.description.trim().length === 0) newErrors.description = 'Description is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit(formData);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title <span className="required">*</span></label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter todo title" className={`form-input ${errors.title ? 'input-error' : ''}`} disabled={isLoading} />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description <span className="required">*</span></label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter todo description" rows="4" className={`form-textarea ${errors.description ? 'input-error' : ''}`} disabled={isLoading} />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority <span className="required">*</span></label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange} className={`form-select ${errors.priority ? 'input-error' : ''}`} disabled={isLoading}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <span className="error-message">{errors.priority}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category <span className="required">*</span></label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} className={`form-select ${errors.category ? 'input-error' : ''}`} disabled={isLoading}>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>
      </div>
      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : (initialData ? 'Update Todo' : 'Add Todo')}
      </button>
    </form>
  );
}

export default TodoForm;
