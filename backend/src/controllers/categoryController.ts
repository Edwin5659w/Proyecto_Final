import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as categoryService from '../services/categoryService';

const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name } = req.body;
  const cat = await categoryService.createCategory(name);
  res.status(201).json(cat);
};

const list = async (req: Request, res: Response) => {
  const cats = await categoryService.getAllCategories();
  res.json(cats);
};

const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const cat = await categoryService.updateCategory(id, name);
  res.json(cat);
};

const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cat = await categoryService.deleteCategory(id);
  res.json(cat);
};

export default { create, list, update, remove };