<template>
  <div>
    <h1>Productos</h1>
    <div class="grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useProductStore } from '../stores/useProductStore';

const store = useProductStore();
const { products } = store.$state;

onMounted(async () => {
  await store.load();
});
</script>

<style scoped>
h1 { margin-bottom:16px }
</style>