import { describe, it, expect, vi } from 'vitest';
import { sessionAuthMiddleware } from './auth.js';

describe('sessionAuthMiddleware', () => {
  it('возвращает 401 если пользователь не авторизован', () => {
    const req = { session: {} } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    sessionAuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Не авторизован' });
    expect(next).not.toHaveBeenCalled();
  });

  it('вызывает next если пользователь авторизован', () => {
    const req = { session: { userId: 1 } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    sessionAuthMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
