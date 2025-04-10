import { createRouter, createWebHistory } from 'vue-router';
import Panel from './components/Panel.vue';
import Home from './components/Home.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/panel',
    component: Panel
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
