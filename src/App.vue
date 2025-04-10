<template>
  <div id="app">
    <div v-if="statusMessage" class="status-banner">{{ statusMessage }}</div>
    <Header
      @open-auth="openAuthModal"
      :user="user"
      :is-authenticated="isAuthenticated"
/>

    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/panel">Панель</router-link>
    </nav>

    <router-view />

    <AuthModal
      :visible="showAuthModal"
      :initialMode="authMode"
      @close="showAuthModal = false"
      @success="showStatusMessage"
      :on-login-success="loadProfile"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import AuthModal from './components/AuthModal.vue';
import { apiFetch } from './api';

const showAuthModal = ref(false);
const authMode = ref<'login' | 'register'>('login');
const statusMessage = ref('');

const user = ref<any>(null);
const isAuthenticated = ref(false);

async function loadProfile() {
  try {
    const res = await apiFetch('/api/profile');
    if (res.ok) {
      const data = await res.json();
      user.value = data;
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
      user.value = null;
    }
  } catch {
    isAuthenticated.value = false;
    user.value = null;
  }
}

onMounted(() => {
  loadProfile();
});

function openAuthModal(mode: 'login' | 'register') {
  authMode.value = mode;
  showAuthModal.value = true;
}

function showStatusMessage(message: string) {
  statusMessage.value = message;
  setTimeout(() => {
    statusMessage.value = '';
  }, 3000);
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
}

nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s, transform 0.3s;
}

nav a:hover {
  color: #42b983;
  transform: scale(1.1);
}

nav a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
  border-bottom: 2px solid #42b983;
}

.status-banner {
  background-color: #42b983;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-weight: bold;
}
</style>
