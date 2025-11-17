import prisma from '../config/prisma';

export const createCategory = async (name: string) => {
  return prisma.category.create({ data: { name } });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({ include: { products: true } });
};

export const updateCategory = async (id: number, name: string) => {
  return prisma.category.update({ where: { id }, data: { name } });
};

export const deleteCategory = async (id: number) => {
  return prisma.category.delete({ where: { id } });
};