import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App.vue', () => {
  it('загружает профиль при монтировании', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, email: 'test@example.com' })
    }) as any;

    const wrapper = mount(App);

    // Ждём обновления
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.html()).toContain('test@example.com');
  });
});
