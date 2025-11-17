import { Request, Response } from 'express';
import * as orderService from '../services/orderService';

const create = async (req: any, res: Response) => {
  const userId = req.user.id;
  const order = await orderService.createOrder(userId);
  res.status(201).json(order);
};

const list = async (req: any, res: Response) => {
  const userId = req.user.id;
  const orders = await orderService.getOrdersByUser(userId);
  res.json(orders);
};

export default { create, list };