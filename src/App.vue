<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/panel">Панель</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
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
</style>
