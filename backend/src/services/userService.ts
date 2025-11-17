import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (name: string | undefined, email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { status: 400, message: 'Email ya registrado' };
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hashed } });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: 'Credenciales inválidas' };
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 400, message: 'Credenciales inválidas' };
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id }, include: { cart: { include: { items: { include: { product: true } } } }, orders: { include: { items: { include: { product: true } } } } } });
};