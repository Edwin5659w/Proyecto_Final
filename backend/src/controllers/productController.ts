import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as productService from '../services/productService';

const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const data = req.body;
  const product = await productService.createProduct(data);
  res.status(201).json(product);
};

const list = async (req: Request, res: Response) => {
  const { page, perPage } = req.query;
  const q = { page: page ? Number(page) : 1, perPage: perPage ? Number(perPage) : 12 };
  const result = await productService.getProducts(q);
  res.json(result);
};

const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await productService.getProductById(id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const product = await productService.updateProduct(id, data);
  res.json(product);
};

const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await productService.deleteProduct(id);
  res.json({ success: true });
};

export default { create, list, getOne, update, remove };