import { describe, it, expect, vi } from 'vitest';
import { authMiddleware } from './auth.js';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'SECRET_KEY';

describe('authMiddleware', () => {
  it('возвращает 401 если нет токена', () => {
    const req = { headers: {} } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('возвращает 401 если токен невалидный', () => {
    const req = { headers: { authorization: 'Bearer invalidtoken' } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('вызывает next если токен валидный', () => {
    const token = jwt.sign({ userId: 1, email: 'test@example.com' }, secret);
    const req = { headers: { authorization: 'Bearer ' + token } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
