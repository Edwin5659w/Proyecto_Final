import { Router } from 'express';
import { body, param, query } from 'express-validator';
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import categoryController from '../controllers/categoryController';
import cartController from '../controllers/cartController';
import orderController from '../controllers/orderController';
import { authenticate } from '../middleware/auth';

const router = Router();

// helper para capturar errores async
const wrap = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Auth
 */
router.post(
  '/auth/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  wrap(userController.register)
);

router.post(
  '/auth/login',
  body('email').isEmail(),
  body('password').exists(),
  wrap(userController.login)
);

router.get('/auth/profile', authenticate, wrap(userController.profile));

/**
 * Products
 */
router.get(
  '/products',
  query('page').optional().isInt({ min: 1 }),
  query('perPage').optional().isInt({ min: 1 }),
  wrap(productController.list)
);

router.get('/products/:id', param('id').isInt(), wrap(productController.getOne));
router.post(
  '/products',
  authenticate,
  body('name').isString().notEmpty(),
  body('price').isNumeric(),
  body('categoryId').isInt(),
  wrap(productController.create)
);
router.put('/products/:id', authenticate, param('id').isInt(), wrap(productController.update));
router.delete('/products/:id', authenticate, param('id').isInt(), wrap(productController.remove));

/**
 * Categories
 */
router.get('/categories', wrap(categoryController.list));
router.post(
  '/categories',
  authenticate,
  body('name').isString().notEmpty(),
  wrap(categoryController.create)
);
router.put('/categories/:id', authenticate, param('id').isInt(), body('name').isString().notEmpty(), wrap(categoryController.update));
router.delete('/categories/:id', authenticate, param('id').isInt(), wrap(categoryController.remove));

/**
 * Cart
 */
router.get('/cart', authenticate, wrap(cartController.getCart));
router.post(
  '/cart',
  authenticate,
  body('productId').isInt(),
  body('quantity').optional().isInt({ min: 1 }),
  wrap(cartController.add)
);
router.put('/cart/:id', authenticate, param('id').isInt(), body('quantity').isInt({ min: 0 }), wrap(cartController.update));
router.delete('/cart/:id', authenticate, param('id').isInt(), wrap(cartController.remove));

/**
 * Orders
 */
router.post('/orders', authenticate, wrap(orderController.create));
router.get('/orders', authenticate, wrap(orderController.list));

export default router;