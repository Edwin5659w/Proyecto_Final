import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Cart from '../views/Cart.vue';
import Profile from '../views/Profile.vue';
import Orders from '../views/Orders.vue';
import ProductDetail from '../views/ProductDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/orders', name: 'Orders', component: Orders }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;