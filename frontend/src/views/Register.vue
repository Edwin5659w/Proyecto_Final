<template>
  <div style="max-width:420px;margin:60px auto">
    <div class="card">
      <h2>Crear Cuenta</h2>
      <form @submit.prevent="submit" style="display:flex;flex-direction:column;gap:12px">
        <input v-model="name" placeholder="Nombre (opcional)" style="padding:8px;border-radius:8px;border:1px solid #ddd" />
        <input v-model="email" placeholder="Email" type="email" required style="padding:8px;border-radius:8px;border:1px solid #ddd" />
        <input v-model="password" placeholder="Contraseña" type="password" required style="padding:8px;border-radius:8px;border:1px solid #ddd" />
        <button class="btn" type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  try {
    await auth.register({ name: name.value, email: email.value, password: password.value });
    await auth.fetchProfile();
    router.push('/');
  } catch (e: any) {
    alert('Error: ' + (e.response?.data?.message || e.message));
  }
};
</script>

<style scoped>
</style>