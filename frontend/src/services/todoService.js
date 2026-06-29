import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/todos';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export const fetchTodos = async () => {
  const response = await axiosInstance.get('/');
  return response.data.data || [];
};

export const fetchTodoById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response.data.data;
};

export const createTodo = async (todoData) => {
  const response = await axiosInstance.post('/', { title: todoData.title, description: todoData.description, priority: todoData.priority, category: todoData.category });
  return response.data.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await axiosInstance.put(`/${id}`, { title: todoData.title, description: todoData.description, priority: todoData.priority, category: todoData.category });
  return response.data.data;
};

export const deleteTodo = async (id) => {
  await axiosInstance.delete(`/${id}`);
};

export const markComplete = async (id) => {
  const response = await axiosInstance.patch(`/${id}/complete`);
  return response.data.data;
};

export const markIncomplete = async (id) => {
  const response = await axiosInstance.patch(`/${id}/incomplete`);
  return response.data.data;
};

export const toggleComplete = async (id, isCurrentlyComplete) => {
  return isCurrentlyComplete ? markIncomplete(id) : markComplete(id);
};

export default axiosInstance;
