import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as productService from '../services/productService';

export const useProductStore = defineStore('products', () => {
  const products = ref<any[]>([]);
  const total = ref(0);

  const load = async (params?: any) => {
    const res = await productService.listProducts(params);
    products.value = res.data.products ?? res.data;
    total.value = res.data.total ?? products.value.length;
    return res;
  };

  const get = async (id: number) => {
    const res = await productService.getProduct(id);
    return res.data;
  };

  return { products, total, load, get };
});