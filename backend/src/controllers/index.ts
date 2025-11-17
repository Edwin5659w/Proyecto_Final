export class IndexController {
    public getIndex(req, res) {
        res.send('Welcome to StyleHub API');
    }

    // Additional methods for handling other routes can be added here
}

export { default as userController } from './userController';
export { default as productController } from './productController';
export { default as categoryController } from './categoryController';
export { default as cartController } from './cartController';
export { default as orderController } from './orderController';