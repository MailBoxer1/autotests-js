import { createRouter, createWebHistory } from 'vue-router';
import Panel from './components/Panel.vue';

const routes = [
  {
    path: '/',
    redirect: '/panel'
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
