const todoService = require('../services/todoService');

const getAllTodos = (req, res) => {
  try {
    const todos = todoService.getAllTodos();
    res.status(200).json({ success: true, data: todos, count: todos.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTodoById = (req, res) => {
  try {
    const { id } = req.params;
    const todo = todoService.getTodoById(id);
    if (!todo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createTodo = (req, res) => {
  try {
    const { title, description, priority, category } = req.body;
    const newTodo = todoService.createTodo({ title, description, priority, category });
    res.status(201).json({ success: true, message: 'Todo created successfully', data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, category } = req.body;
    const updatedTodo = todoService.updateTodo(id, { title, description, priority, category });
    if (!updatedTodo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.status(200).json({ success: true, message: 'Todo updated successfully', data: updatedTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = todoService.deleteTodo(id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const markComplete = (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = todoService.markComplete(id);
    if (!updatedTodo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.status(200).json({ success: true, message: 'Todo marked as complete', data: updatedTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const markIncomplete = (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = todoService.markIncomplete(id);
    if (!updatedTodo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.status(200).json({ success: true, message: 'Todo marked as incomplete', data: updatedTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, markComplete, markIncomplete };
