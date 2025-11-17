import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as cartService from '../services/cartService';

const getCart = async (req: any, res: Response) => {
  const userId = req.user.id;
  const cart = await cartService.getOrCreateCart(userId);
  res.json(cart);
};

const add = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const item = await cartService.addToCart(userId, Number(productId), Number(quantity || 1));
  res.status(201).json(item);
};

const update = async (req: any, res: Response) => {
  const userId = req.user.id;
  const itemId = Number(req.params.id);
  const { quantity } = req.body;
  const item = await cartService.updateCartItem(userId, itemId, Number(quantity));
  res.json(item);
};

const remove = async (req: any, res: Response) => {
  const userId = req.user.id;
  const itemId = Number(req.params.id);
  const result = await cartService.removeCartItem(userId, itemId);
  res.json(result);
};

export default { getCart, add, update, remove };