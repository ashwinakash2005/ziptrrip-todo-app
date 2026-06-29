const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/todos.json');

const readTodos = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeTodos = (todos) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing todos:', error);
    throw error;
  }
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const getAllTodos = () => readTodos();

const getTodoById = (id) => {
  const todos = readTodos();
  return todos.find(todo => todo.id === id) || null;
};

const createTodo = (todoData) => {
  const todos = readTodos();
  const newTodo = {
    id: generateId(),
    title: todoData.title,
    description: todoData.description,
    completed: false,
    priority: todoData.priority,
    category: todoData.category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  todos.push(newTodo);
  writeTodos(todos);
  return newTodo;
};

const updateTodo = (id, todoData) => {
  const todos = readTodos();
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return null;
  const updatedTodo = {
    ...todos[todoIndex],
    title: todoData.title || todos[todoIndex].title,
    description: todoData.description || todos[todoIndex].description,
    priority: todoData.priority || todos[todoIndex].priority,
    category: todoData.category || todos[todoIndex].category,
    updatedAt: new Date().toISOString()
  };
  todos[todoIndex] = updatedTodo;
  writeTodos(todos);
  return updatedTodo;
};

const deleteTodo = (id) => {
  const todos = readTodos();
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return false;
  todos.splice(todoIndex, 1);
  writeTodos(todos);
  return true;
};

const markComplete = (id) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === id);
  if (!todo) return null;
  todo.completed = true;
  todo.updatedAt = new Date().toISOString();
  writeTodos(todos);
  return todo;
};

const markIncomplete = (id) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === id);
  if (!todo) return null;
  todo.completed = false;
  todo.updatedAt = new Date().toISOString();
  writeTodos(todos);
  return todo;
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, markComplete, markIncomplete };
