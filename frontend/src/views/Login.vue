<template>
  <div style="max-width:420px;margin:60px auto">
    <div class="card">
      <h2>Ingresar</h2>
      <form @submit.prevent="submit" style="display:flex;flex-direction:column;gap:12px">
        <input v-model="email" placeholder="Email" type="email" required style="padding:8px;border-radius:8px;border:1px solid #ddd" />
        <input v-model="password" placeholder="Contraseña" type="password" required style="padding:8px;border-radius:8px;border:1px solid #ddd" />
        <button class="btn" type="submit">Ingresar</button>
      </form>
      <p style="margin-top:12px;text-align:center;font-size:14px">¿No tienes cuenta? <router-link to="/register" style="color:var(--accent);text-decoration:none">Regístrate</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  try {
    await auth.login({ email: email.value, password: password.value });
    await auth.fetchProfile();
    router.push('/');
  } catch (e: any) {
    alert('Error: ' + (e.response?.data?.message || e.message));
  }
};
</script>

<style scoped>
</style>