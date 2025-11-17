<template>
  <div class="card">
    <img v-if="product.image" :src="product.image" alt="img" style="width:100%;height:150px;object-fit:cover;border-radius:8px" />
    <h3 style="margin:8px 0">{{ product.name }}</h3>
    <p class="muted" style="font-size:12px;margin:4px 0">{{ product.category?.name ?? 'Sin categoría' }}</p>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
      <b>${{ product.price.toFixed(2) }}</b>
      <router-link :to="`/product/${product.id}`" class="btn">Ver</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ product: Object });
</script>

<style scoped>
.muted { color:var(--muted) }
</style>