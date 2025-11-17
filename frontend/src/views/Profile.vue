<template>
  <div>
    <h1>Mi Perfil</h1>
    <div class="card" v-if="user">
      <p><b>Nombre:</b> {{ user?.name ?? 'Sin nombre' }}</p>
      <p><b>Email:</b> {{ user?.email }}</p>
      <p><b>Pedidos:</b> {{ user?.orders?.length ?? 0 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';

const router = useRouter();
const auth = useAuthStore();
const user = ref<any>(null);

onMounted(async () => {
  if (!auth.user) router.push('/login');
  await auth.fetchProfile();
  user.value = auth.user;
});
</script>

<style scoped>
</style>