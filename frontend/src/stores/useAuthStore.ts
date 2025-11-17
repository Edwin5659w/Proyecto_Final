import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as auth from '../services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null);
  const token = ref<string | null>(localStorage.getItem('token'));

  const setToken = (t: string | null) => {
    token.value = t;
    if (t) localStorage.setItem('token', t);
    else localStorage.removeItem('token');
  };

  const register = async (payload: any) => {
    const res = await auth.register(payload);
    setToken(res.data.token);
    user.value = res.data.user;
    return res;
  };

  const login = async (payload: any) => {
    const res = await auth.login(payload);
    setToken(res.data.token);
    user.value = res.data.user;
    return res;
  };

  const fetchProfile = async () => {
    if (!token.value) return null;
    const res = await auth.fetchProfile();
    user.value = res.data;
    return res;
  };

  const logout = () => {
    setToken(null);
    user.value = null;
  };

  return { user, token, setToken, register, login, fetchProfile, logout };
});