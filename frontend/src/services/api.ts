import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor lee token de localStorage para no depender de Pinia en import time
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) { /* ignore */ }
  return config;
});

export default api;