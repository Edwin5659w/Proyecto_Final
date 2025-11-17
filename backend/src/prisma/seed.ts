import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Limpiar datos previos
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuario demo
  const password = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Demo User',
      email: 'demo@stylehub.com',
      password
    }
  });

  // Crear categorías
  const ropa = await prisma.category.create({
    data: { name: 'Ropa' }
  });

  const calzado = await prisma.category.create({
    data: { name: 'Calzado' }
  });

  const accesorios = await prisma.category.create({
    data: { name: 'Accesorios' }
  });

  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta Básica',
        description: 'Camiseta de algodón 100%',
        price: 19.99,
        stock: 50,
        categoryId: ropa.id,
        image: 'https://picsum.photos/600/400?random=1'
      },
      {
        name: 'Jeans Slim',
        description: 'Jeans de denim oscuro',
        price: 49.99,
        stock: 30,
        categoryId: ropa.id,
        image: 'https://picsum.photos/600/400?random=2'
      },
      {
        name: 'Chaqueta Denim',
        description: 'Chaqueta de denim clásica',
        price: 89.0,
        stock: 10,
        categoryId: ropa.id,
        image: 'https://picsum.photos/600/400?random=3'
      },
      {
        name: 'Zapatillas Urbanas',
        description: 'Zapatillas cómodas y ligeras',
        price: 79.99,
        stock: 20,
        categoryId: calzado.id,
        image: 'https://picsum.photos/600/400?random=4'
      },
      {
        name: 'Botas de Cuero',
        description: 'Botas de cuero premium',
        price: 129.99,
        stock: 15,
        categoryId: calzado.id,
        image: 'https://picsum.photos/600/400?random=5'
      },
      {
        name: 'Gorra Snapback',
        description: 'Gorra unisex con cierre snapback',
        price: 15.5,
        stock: 100,
        categoryId: accesorios.id,
        image: 'https://picsum.photos/600/400?random=6'
      },
      {
        name: 'Cinturón de Cuero',
        description: 'Cinturón de cuero marrón',
        price: 35.0,
        stock: 40,
        categoryId: accesorios.id,
        image: 'https://picsum.photos/600/400?random=7'
      },
      {
        name: 'Mochila Urbana',
        description: 'Mochila con múltiples compartimentos',
        price: 59.99,
        stock: 25,
        categoryId: accesorios.id,
        image: 'https://picsum.photos/600/400?random=8'
      }
    ]
  });

  // Crear carrito para usuario demo
  await prisma.cart.create({
    data: {
      userId: user.id
    }
  });

  console.log('Seed completado exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });