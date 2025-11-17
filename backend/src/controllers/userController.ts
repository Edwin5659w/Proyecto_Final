import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as userService from '../services/userService';

const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  const result = await userService.registerUser(name, email, password);
  res.status(201).json(result);
};

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const result = await userService.loginUser(email, password);
  res.json(result);
};

const profile = async (req: any, res: Response) => {
  const userId = req.user.id;
  const user = await userService.getUserById(userId);
  res.json(user);
};

export default { register, login, profile };