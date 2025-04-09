import { render, screen, waitFor } from '@testing-library/vue';
import Panel from './Panel.vue';
import { vi } from 'vitest';

describe('Panel.vue', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((url: string) => {
      if (url.includes('/api/users')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: [
            { id: 1, role: 'admin' },
            { id: 2, role: 'user' },
            { id: 3, role: 'user' }
          ] })
        } as Response);
      }
      if (url.includes('/api/posts')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: [
            { id: 1, user_id: 1 },
            { id: 2, user_id: 2 },
            { id: 3, user_id: 2 }
          ] })
        } as Response);
      }
      if (url.includes('/api/comments')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: [
            { id: 1, post_id: 1 },
            { id: 2, post_id: 2 },
            { id: 3, post_id: 2 }
          ] })
        } as Response);
      }
      if (url.includes('/api/messages')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: [
            { id: 1, sender_id: 1 },
            { id: 2, sender_id: 2 },
            { id: 3, sender_id: 2 }
          ] })
        } as Response);
      }
      return Promise.resolve({ json: () => Promise.resolve({ data: [] }) } as Response);
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('рендерит заголовки графиков', async () => {
    render(Panel);
    await waitFor(() => {
      expect(screen.getByText('Пользователи по ролям')).toBeTruthy();
      expect(screen.getByText('Посты по пользователям')).toBeTruthy();
      expect(screen.getByText('Комментарии по постам')).toBeTruthy();
      expect(screen.getByText('Сообщения по пользователям')).toBeTruthy();
    });
  });
});
