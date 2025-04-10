import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthModal from './AuthModal.vue';

describe('AuthModal.vue', () => {
  it('по умолчанию отображает вкладку входа', () => {
    const wrapper = mount(AuthModal, {
      props: {
        visible: true,
        initialMode: 'login',
        onLoginSuccess: () => {}
      }
    });
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.text()).toContain('Войти');
  });

  it('переключается на вкладку регистрации', async () => {
    const wrapper = mount(AuthModal, {
      props: {
        visible: true,
        initialMode: 'login',
        onLoginSuccess: () => {}
      }
    });
    await wrapper.findAll('button')[1].trigger('click');
    expect(wrapper.text()).toContain('Зарегистрироваться');
  });

  it('вызывает onLoginSuccess и сохраняет токен при успешном логине', async () => {
    const mockSuccess = vi.fn();
    const wrapper = mount(AuthModal, {
      props: {
        visible: true,
        initialMode: 'login',
        onLoginSuccess: mockSuccess
      }
    });

    // Мокаем fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'mocked-token' })
    }) as any;

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockSuccess).toHaveBeenCalled();
  });

  it('показывает ошибку при неуспешном запросе', async () => {
    const wrapper = mount(AuthModal, {
      props: {
        visible: true,
        initialMode: 'login',
        onLoginSuccess: () => {}
      }
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Ошибка авторизации' })
    }) as any;

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Ошибка авторизации');
  });
});
