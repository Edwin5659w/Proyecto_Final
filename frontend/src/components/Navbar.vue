<template>
  <header class="header">
    <div class="logo">
      <router-link to="/"><strong>StyleHub</strong></router-link>
    </div>
    <nav class="nav">
      <router-link to="/">Inicio</router-link>
      <router-link to="/cart">Carrito</router-link>
      <router-link v-if="user" to="/orders">Mis Pedidos</router-link>
      <router-link v-if="!user" to="/login">Ingresar</router-link>
      <div v-else style="display:flex;align-items:center;gap:8px">
        <span>{{ user.name ?? user.email }}</span>
        <a href="#" @click.prevent="logout" style="color:var(--muted);text-decoration:none">Salir</a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/useAuthStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const { user } = storeToRefs(auth);
const router = useRouter();

onMounted(async () => {
  await auth.fetchProfile();
});

const logout = () => {
  auth.logout();
  router.push('/');
};
</script>

<style scoped>
.header { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.1) }
.logo { font-size:20px }
.logo a { text-decoration:none; color:var(--accent) }
.nav { display:flex; gap:16px; align-items:center }
.nav a { color:var(--muted); text-decoration:none }
.nav a:hover { color:var(--accent) }
</style>