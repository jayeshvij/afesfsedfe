import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, Product, CartItem, Order, OrderRequest, CartItemRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data: LoginRequest): Promise<AuthResponse> =>
    api.post('/auth/login', data).then(res => res.data),
  
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    api.post('/auth/register', data).then(res => res.data),
};

export const productAPI = {
  getAll: (): Promise<Product[]> =>
    api.get('/products').then(res => res.data),
  
  getById: (id: number): Promise<Product> =>
    api.get(`/products/${id}`).then(res => res.data),
};

export const cartAPI = {
  getItems: (): Promise<CartItem[]> =>
    api.get('/cart').then(res => res.data),
  
  addItem: (data: CartItemRequest): Promise<CartItem> =>
    api.post('/cart/add', data).then(res => res.data),
  
  removeItem: (productId: number): Promise<void> =>
    api.delete(`/cart/remove/${productId}`),
  
  clearCart: (): Promise<void> =>
    api.delete('/cart/clear'),
};

export const orderAPI = {
  placeOrder: (data: OrderRequest): Promise<Order> =>
    api.post('/orders', data).then(res => res.data),
  
  getUserOrders: (): Promise<Order[]> =>
    api.get('/orders').then(res => res.data),
  
  getOrderById: (id: number): Promise<Order> =>
    api.get(`/orders/${id}`).then(res => res.data),
};

export const adminAPI = {
  getAllOrders: (): Promise<Order[]> =>
    api.get('/admin/orders').then(res => res.data),
  
  getAllProducts: (): Promise<Product[]> =>
    api.get('/admin/products').then(res => res.data),
  
  createProduct: (product: Omit<Product, 'id'>): Promise<Product> =>
    api.post('/admin/products', product).then(res => res.data),
  
  updateProduct: (id: number, product: Partial<Product>): Promise<Product> =>
    api.put(`/admin/products/${id}`, product).then(res => res.data),
  
  deleteProduct: (id: number): Promise<void> =>
    api.delete(`/admin/products/${id}`),
};

export const storeAPI = {
  getPendingOrders: (): Promise<Order[]> =>
    api.get('/store/orders').then(res => res.data),
  
  markAsPacked: (orderId: number): Promise<Order> =>
    api.put(`/store/orders/${orderId}/pack`).then(res => res.data),
  
  assignDriver: (orderId: number, driverId: number): Promise<Order> =>
    api.put(`/store/orders/${orderId}/assign-driver?driverId=${driverId}`).then(res => res.data),
};

export const driverAPI = {
  getAssignedOrders: (): Promise<Order[]> =>
    api.get('/driver/orders').then(res => res.data),
  
  markAsDelivered: (orderId: number): Promise<Order> =>
    api.put(`/driver/orders/${orderId}/deliver`).then(res => res.data),
};
