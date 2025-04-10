import { render, fireEvent } from '@testing-library/vue';
import Home from './Home.vue';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

const push = vi.fn();

vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router');
  return {
    ...actual,
    useRouter: () => ({ push }),
  };
});

describe('Home.vue', () => {
  it('рендерит заголовок и кнопку', () => {
    const { getByText } = render(Home, {
      global: {
        plugins: [
          createRouter({
            history: createWebHistory(),
            routes: [],
          }),
        ],
      },
    });
    expect(getByText('Добро пожаловать!')).toBeTruthy();
    expect(getByText('Перейти к панели')).toBeTruthy();
  });

  it('переходит на /panel при клике по кнопке', async () => {
    const { getByText } = render(Home);

    const button = getByText('Перейти к панели');
    await fireEvent.click(button);
    // Проверяем, что push был вызван
    const { useRouter } = await import('vue-router');
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith('/panel');
  });
});
