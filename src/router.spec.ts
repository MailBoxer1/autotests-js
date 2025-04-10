import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import Panel from './components/Panel.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/panel', component: Panel },
];

describe('Router', () => {
  it('отображает Home на / и Panel на /panel', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    const { getByText, queryByText } = render(App, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();

    // Проверка главной страницы
    expect(getByText('Добро пожаловать!')).toBeTruthy();

    // Переход на /panel
    await router.push('/panel');
    await router.isReady();

    expect(getByText('Пользователи по ролям')).toBeTruthy();
    expect(queryByText('Добро пожаловать!')).toBeNull();

    // Переход обратно на /
    await router.push('/');
    await router.isReady();

    expect(getByText('Добро пожаловать!')).toBeTruthy();
  });
});
