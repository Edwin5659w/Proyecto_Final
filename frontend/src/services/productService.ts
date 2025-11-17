import api from './api';

export const listProducts = (params?: any) => api.get('/products', { params });
export const getProduct = (id: number) => api.get(`/products/${id}`);
export const createProduct = (payload: any) => api.post('/products', payload);
export const updateProduct = (id: number, payload: any) => api.put(`/products/${id}`, payload);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
export const listCategories = () => api.get('/categories');