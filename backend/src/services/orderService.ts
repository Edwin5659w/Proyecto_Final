import prisma from '../config/prisma';

export const createOrder = async (userId: number) => {
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
  if (!cart || cart.items.length === 0) throw { status: 400, message: 'Carrito vacío' };
  let total = 0;
  const itemsData = cart.items.map(it => {
    total += it.product.price * it.quantity;
    return { productId: it.productId, quantity: it.quantity, price: it.product.price };
  });
  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: { create: itemsData }
    },
    include: { items: true }
  });
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return order;
};

export const getOrdersByUser = async (userId: number) => {
  return prisma.order.findMany({ where: { userId }, include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } });
};