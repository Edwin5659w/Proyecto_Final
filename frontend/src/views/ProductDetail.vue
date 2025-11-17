<template>
  <div v-if="product" class="card">
    <img v-if="product.image" :src="product.image" alt="img" style="width:100%;height:300px;object-fit:cover;border-radius:8px" />
    <h2 style="margin:16px 0">{{ product.name }}</h2>
    <p class="muted">{{ product.category?.name }}</p>
    <p style="color:#555;margin:12px 0">{{ product.description }}</p>
    <h3 style="color:var(--accent);margin:8px 0">${{ product.price.toFixed(2) }}</h3>
    <div style="display:flex;gap:8px;margin-top:16px">
      <input v-model.number="qty" type="number" min="1" style="width:80px;padding:8px;border-radius:8px;border:1px solid #ddd" />
      <button class="btn" @click="add">Agregar al carrito</button>
    </div>
  </div>
  <div v-else class="card">Producto no encontrado</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref<any>(null);
const qty = ref(1);

onMounted(async () => {
  const id = Number(route.params.id);
  product.value = await productStore.get(id);
});

const add = async () => {
  if (!product.value) return;
  await cartStore.add(product.value.id, qty.value);
  alert('Producto añadido al carrito');
  qty.value = 1;
};
</script>

<style scoped>
.muted { color:var(--muted) }
</style>