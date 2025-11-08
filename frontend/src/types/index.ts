export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'STORE_OWNER' | 'DRIVER';
  address?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user: User;
  address: string;
  totalAmount: number;
  status: 'PLACED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  createdAt: string;
  driver?: User;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface OrderRequest {
  address: string;
  totalAmount: number;
}

export interface CartItemRequest {
  productId: number;
  quantity: number;
}
