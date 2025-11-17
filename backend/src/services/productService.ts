import prisma from '../config/prisma';

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock?: number;
  categoryId: number;
}) => {
  return prisma.product.create({ data });
};

export const getProducts = async (query?: { page?: number; perPage?: number; category?: number }) => {
  const page = query?.page ?? 1;
  const perPage = query?.perPage ?? 12;
  const where = query?.category ? { categoryId: query.category } : {};
  const products = await prisma.product.findMany({
    where,
    skip: (page - 1) * perPage,
    take: perPage,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  const total = await prisma.product.count({ where });
  return { products, total, page, perPage };
};

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({ where: { id }, include: { category: true } });
};

export const updateProduct = async (id: number, data: any) => {
  return prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: number) => {
  return prisma.product.delete({ where: { id } });
};