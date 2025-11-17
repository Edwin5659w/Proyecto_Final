import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as cartService from '../services/cartService';

export const useCartStore = defineStore('cart', () => {
  const items = ref<any[]>([]);
  const loading = ref(false);

  const load = async () => {
    loading.value = true;
    try {
      const res = await cartService.getCart();
      items.value = res.data.items ?? [];
    } finally {
      loading.value = false;
    }
  };

  const add = async (productId: number, quantity = 1) => {
    await cartService.addToCart({ productId, quantity });
    await load();
  };

  const update = async (id: number, quantity: number) => {
    await cartService.updateCartItem(id, { quantity });
    await load();
  };

  const remove = async (id: number) => {
    await cartService.removeCartItem(id);
    await load();
  };

  return { items, loading, load, add, update, remove };
});