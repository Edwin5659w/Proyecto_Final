import api from './api';

export const createOrder = () => api.post('/orders');
export const listOrders = () => api.get('/orders');