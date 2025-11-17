<template>
  <div>
    <Navbar />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue';
</script>

<style scoped>
</style>