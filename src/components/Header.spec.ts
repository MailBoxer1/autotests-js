import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from './Header.vue';

describe('Header.vue', () => {
  it('показывает кнопки Войти и Регистрация, если не авторизован', () => {
    const wrapper = mount(Header, {
      props: {
        isAuthenticated: false,
        user: null
      }
    });
    expect(wrapper.text()).toContain('Войти');
    expect(wrapper.text()).toContain('Регистрация');
  });

  it('показывает email и кнопку Выйти, если авторизован', () => {
    const wrapper = mount(Header, {
      props: {
        isAuthenticated: true,
        user: { email: 'test@example.com' }
      }
    });
    expect(wrapper.text()).toContain('test@example.com');
    expect(wrapper.text()).toContain('Выйти');
  });

  it('вызывает logout при клике на кнопку Выйти', async () => {
    const originalReload = window.location.reload;
    // удаляем свойство, чтобы можно было замокать
    delete (window.location as any).reload;
    window.location.reload = vi.fn();

    const wrapper = mount(Header, {
      props: {
        isAuthenticated: true,
        user: { email: 'test@example.com' }
      }
    });

    await wrapper.find('button.logout').trigger('click');

    expect(window.location.reload).toHaveBeenCalled();

    // восстанавливаем оригинальное свойство
    window.location.reload = originalReload;
  });
});
