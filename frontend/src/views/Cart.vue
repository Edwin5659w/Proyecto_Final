<template>
  <div>
    <h1>Carrito</h1>
    <div v-if="items.length === 0" class="card">Carrito vacío</div>
    <div v-else>
      <div v-for="it in items" :key="it.id" class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:8px;padding:12px">
        <img v-if="it.product.image" :src="it.product.image" style="width:80px;height:80px;object-fit:cover;border-radius:8px" />
        <div style="flex:1">
          <h3 style="margin:0">{{ it.product.name }}</h3>
          <p class="muted" style="margin:4px 0">${{ it.product.price.toFixed(2) }}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          <input v-model.number="it.quantity" type="number" min="1" @change="update(it)" style="width:80px;padding:6px;border-radius:8px;border:1px solid #ddd" />
          <button class="btn" @click="remove(it.id)" style="background:#e74c3c">Eliminar</button>
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <h3>Total: ${{ total.toFixed(2) }}</h3>
        <button class="btn" @click="checkout" style="width:100%;margin-top:12px">Confirmar Pedido</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';
import { createOrder } from '../services/orderService';

const cartStore = useCartStore();
const auth = useAuthStore();
const router = useRouter();

const { items } = cartStore.$state;

onMounted(async () => {
  if (!auth.user) router.push('/login');
  await cartStore.load();
});

const total = computed(() => items.reduce((s: number, it: any) => s + it.product.price * it.quantity, 0));

const update = async (it: any) => {
  await cartStore.update(it.id, it.quantity);
};

const remove = async (id: number) => {
  await cartStore.remove(id);
};

const checkout = async () => {
  try {
    await createOrder();
    cartStore.items = [];
    alert('Pedido creado correctamente');
    router.push('/orders');
  } catch (e: any) {
    alert('Error: ' + (e.response?.data?.message || e.message));
  }
};
</script>

<style scoped>
.muted { color:var(--muted) }
</style>