import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthRequest } from '../types';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });

  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Token error' });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Token malformado' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};