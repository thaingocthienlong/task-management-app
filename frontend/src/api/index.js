import axios from 'axios';

// When running in Docker, our backend service will be accessible via the service name
const API = axios.create({ baseURL: '/api' });

export const fetchTasks = () => API.get('/tasks');
export const createTask = (newTask) => API.post('/tasks', newTask);
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);