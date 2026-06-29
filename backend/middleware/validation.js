const validateTodo = (req, res, next) => {
  const { title, description, priority, category } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length === 0)
    return res.status(400).json({ success: false, error: 'Title is required and must be a non-empty string' });
  if (!description || typeof description !== 'string' || description.trim().length === 0)
    return res.status(400).json({ success: false, error: 'Description is required and must be a non-empty string' });
  const validPriorities = ['low', 'medium', 'high'];
  if (!priority || !validPriorities.includes(priority.toLowerCase()))
    return res.status(400).json({ success: false, error: 'Priority must be one of: low, medium, high' });
  const validCategories = ['work', 'personal', 'shopping', 'health', 'other'];
  if (!category || !validCategories.includes(category.toLowerCase()))
    return res.status(400).json({ success: false, error: 'Category must be one of: work, personal, shopping, health, other' });
  req.body.priority = priority.toLowerCase();
  req.body.category = category.toLowerCase();
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string' || id.trim().length === 0)
    return res.status(400).json({ success: false, error: 'Invalid todo ID' });
  next();
};

module.exports = { validateTodo, validateId };
