<template>
  <div>
    <h1>Mis Pedidos</h1>
    <div v-if="orders.length === 0" class="card">No hay pedidos</div>
    <div v-else>
      <div v-for="o in orders" :key="o.id" class="card" style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h3 style="margin:0">Pedido #{{ o.id }}</h3>
          <span style="background:#3498db;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px">{{ o.status }}</span>
        </div>
        <p class="muted">{{ new Date(o.createdAt).toLocaleString() }}</p>
        <div style="border-top:1px solid #eee;padding-top:8px;margin:8px 0">
          <div v-for="it in o.items" :key="it.id" style="display:flex;justify-content:space-between;font-size:14px;margin:4px 0">
            <div>{{ it.product?.name ?? `Producto ${it.productId}` }} x {{ it.quantity }}</div>
            <div>${{ (it.price * it.quantity).toFixed(2) }}</div>
          </div>
        </div>
        <h4 style="margin:8px 0;text-align:right">Total: ${{ o.total.toFixed(2) }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';
import { listOrders } from '../services/orderService';

const router = useRouter();
const auth = useAuthStore();
const orders = ref<any[]>([]);

onMounted(async () => {
  if (!auth.user) router.push('/login');
  const res = await listOrders();
  orders.value = res.data;
});
</script>

<style scoped>
.muted { color:var(--muted) }
</style>