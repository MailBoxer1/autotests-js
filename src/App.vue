<template>
  <div id="app">
    <h1>Привет из Vue + Vite + TypeScript!</h1>
    <p>Проект успешно интегрирован с Vue.</p>
    <Counter></Counter>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Counter from './components/Counter.vue';

export default defineComponent({
  name: 'App',
  components: {
    Counter,
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}
</style>
