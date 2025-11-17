import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface Order {
    id: string;
    userId: string;
    productIds: string[];
    totalAmount: number;
    orderDate: Date;
}

export interface Response<T> {
    data: T;
    message: string;
    success: boolean;
}