import api from './api';

export const register = (payload: { name?: string; email: string; password: string }) =>
  api.post('/auth/register', payload);

export const login = (payload: { email: string; password: string }) =>
  api.post('/auth/login', payload);

export const fetchProfile = () => api.get('/auth/profile');