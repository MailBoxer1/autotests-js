import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'SECRET_KEY';

describe('JWT генерация и проверка', () => {
  it('создаёт и проверяет токен', () => {
    const payload = { userId: 123, email: 'test@example.com' };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, secret) as any;
    expect(decoded.userId).toBe(123);
    expect(decoded.email).toBe('test@example.com');
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });
});
