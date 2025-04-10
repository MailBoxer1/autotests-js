<template>
  <header class="header">
    <h1>My App</h1>
    <div class="auth-buttons">
      <template v-if="isAuthenticated">
        <span>{{ user?.email }}</span>
        <button class="logout" @click="logout">Выйти</button>
      </template>
      <template v-else>
        <button @click="$emit('open-auth', 'login')">Войти</button>
        <button @click="$emit('open-auth', 'register')">Регистрация</button>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  isAuthenticated: boolean;
  user: any;
}>();

const emit = defineEmits<{
  (e: 'open-auth', mode: 'login' | 'register'): void;
}>();

async function logout() {
  try {
    await fetch('/api/logout', { method: 'POST' });
  } catch {
    // ignore
  }
  location.reload();
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
}

.auth-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: white;
  color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-buttons button:hover {
  background-color: #e0e0e0;
}
</style>
