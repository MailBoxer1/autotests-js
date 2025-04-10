<template>
  <div v-if="visible" class="modal-overlay" 
       @mousedown.self="onOverlayMouseDown" 
       @mouseup.self="onOverlayMouseUp">
    <div class="modal">
      <div class="modal-header">
        <div class="tabs">
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Вход</button>
          <button :class="{ active: mode === 'register' }" @click="mode = 'register'">Регистрация</button>
        </div>
        <button class="close-button" @click="close">×</button>
      </div>

<form v-if="mode === 'login'" @submit.prevent="login">
  <input v-model="loginEmail" name="email" type="email" placeholder="Email" required />
  <input v-model="loginPassword" name="password" type="password" placeholder="Пароль" required />
  <button type="submit">Войти</button>
</form>

<form v-else @submit.prevent="register">
  <input v-model="registerUsername" name="username" placeholder="Имя пользователя" required />
  <input v-model="registerEmail" name="email" type="email" placeholder="Email" required />
  <input v-model="registerPassword" name="password" type="password" placeholder="Пароль" required minlength="6" />
  <button type="submit">Зарегистрироваться</button>
</form>

      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const clickStartedOnOverlay = ref(false);

function onOverlayMouseDown(event: MouseEvent) {
  if (!(event.target instanceof HTMLElement)) return;
  if (!event.target.closest('.modal')) {
    clickStartedOnOverlay.value = true;
  } else {
    clickStartedOnOverlay.value = false;
  }
}

function onOverlayMouseUp(event: MouseEvent) {
  if (!(event.target instanceof HTMLElement)) return;
  if (!event.target.closest('.modal') && clickStartedOnOverlay.value) {
    close();
  }
  clickStartedOnOverlay.value = false;
}

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
      // Автоматический вход после успешной регистрации
      loginEmail.value = registerEmail.value;
      loginPassword.value = registerPassword.value;
      await login();
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  background: transparent;
  border: 2px solid red;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  color: red;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: red;
  color: white;
  transform: scale(1.2);
}

.tabs {
  display: flex;
  gap: 5px;
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
