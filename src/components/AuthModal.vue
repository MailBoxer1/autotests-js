<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Вход</button>
        <button :class="{ active: mode === 'register' }" @click="mode = 'register'">Регистрация</button>
      </div>

      <form v-if="mode === 'login'" @submit.prevent="login">
        <input v-model="loginEmail" type="email" placeholder="Email" required />
        <input v-model="loginPassword" type="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>

      <form v-else @submit.prevent="register">
        <input v-model="registerUsername" placeholder="Имя пользователя" required />
        <input v-model="registerEmail" type="email" placeholder="Email" required />
        <input v-model="registerPassword" type="password" placeholder="Пароль" required minlength="6" />
        <button type="submit">Зарегистрироваться</button>
      </form>

      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  visible: boolean;
  initialMode: 'login' | 'register';
  onLoginSuccess: () => void;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success', message: string): void;
}>();

const mode = ref(props.initialMode);
watch(() => props.initialMode, (val) => mode.value = val);

const message = ref('');

// Login form
const loginEmail = ref('');
const loginPassword = ref('');

async function login() {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      emit('success', 'Вход выполнен успешно');
      props.onLoginSuccess();
      close();
    } else {
      message.value = data.error || 'Ошибка входа';
    }
  } catch (err) {
    console.error(err);
    message.value = 'Ошибка сети';
  }
}

// Register form
const registerUsername = ref('');
const registerEmail = ref('');
const registerPassword = ref('');

async function register() {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      emit('success', 'Регистрация прошла успешно');
      close();
    } else {
      message.value = data.error || 'Ошибка регистрации';
    }
  } catch (err) {
    console.error(err);
    message.value = 'Ошибка сети';
  }
}

function close() {
  emit('close');
  message.value = '';
  loginEmail.value = '';
  loginPassword.value = '';
  registerUsername.value = '';
  registerEmail.value = '';
  registerPassword.value = '';
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.tabs {
  display: flex;
  margin-bottom: 10px;
}

.tabs button {
  flex: 1;
  padding: 8px;
  border: none;
  background: #eee;
  cursor: pointer;
}

.tabs button.active {
  background: #42b983;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
}

form input {
  margin-bottom: 10px;
  padding: 8px;
}

form button {
  padding: 10px;
}
</style>
