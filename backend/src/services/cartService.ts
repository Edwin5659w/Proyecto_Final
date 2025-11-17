import prisma from '../config/prisma';

export const getOrCreateCart = async (userId: number) => {
  let cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId }, include: { items: { include: { product: true } } } });
  }
  return cart;
};

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const cart = await getOrCreateCart(userId);
  const existing = await prisma.cartItem.findUnique({ where: { cartId_productId: { cartId: cart.id, productId } } });
  if (existing) {
    return prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + quantity }, include: { product: true } });
  } else {
    return prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity }, include: { product: true } });
  }
};

export const updateCartItem = async (userId: number, itemId: number, quantity: number) => {
  const item = await prisma.cartItem.findUnique({ where: { id: itemId }, include: { cart: true } });
  if (!item || item.cart.userId !== userId) throw { status: 404, message: 'Item no encontrado' };
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
    return null;
  }
  return prisma.cartItem.update({ where: { id: itemId }, data: { quantity }, include: { product: true } });
};

export const removeCartItem = async (userId: number, itemId: number) => {
  const item = await prisma.cartItem.findUnique({ where: { id: itemId }, include: { cart: true } });
  if (!item || item.cart.userId !== userId) throw { status: 404, message: 'Item no encontrado' };
  await prisma.cartItem.delete({ where: { id: itemId } });
  return { success: true };
};