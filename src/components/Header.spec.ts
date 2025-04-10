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
    const mockLogout = vi.fn();
    const wrapper = mount(Header, {
      props: {
        isAuthenticated: true,
        user: { email: 'test@example.com' },
        onLogout: mockLogout
      }
    });

    await wrapper.find('button.logout').trigger('click');
    expect(mockLogout).toHaveBeenCalled();
  });
});
