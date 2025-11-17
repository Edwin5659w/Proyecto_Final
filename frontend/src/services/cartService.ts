import api from './api';

export const getCart = () => api.get('/cart');
export const addToCart = (payload: { productId: number; quantity?: number }) => api.post('/cart', payload);
export const updateCartItem = (id: number, payload: { quantity: number }) => api.put(`/cart/${id}`, payload);
export const removeCartItem = (id: number) => api.delete(`/cart/${id}`);