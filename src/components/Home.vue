<template>
  <div class="home-container">
    <div class="welcome-card">
      <h1>Добро пожаловать!</h1>
      <p>Это современное Vue-приложение с TypeScript, Vite и красивым интерфейсом.</p>
      <button @click="goToPanel">Перейти к панели</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const goToPanel = () => {
      router.push('/panel');
    };
    return { goToPanel };
  },
});
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background: linear-gradient(135deg, #42b983, #2c3e50);
  padding: 40px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.welcome-card {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.welcome-card h1 {
  margin-bottom: 20px;
  font-size: 32px;
  color: #333;
}

.welcome-card p {
  font-size: 18px;
  margin-bottom: 30px;
  color: #555;
}

.welcome-card button {
  background-color: #42b983;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.welcome-card button:hover {
  background-color: #369f6b;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
