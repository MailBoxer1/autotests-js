import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    void res.status(401).json({ error: 'Нет токена' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Проверяется токен:', token);
  try {
    const secret = process.env.JWT_SECRET || 'SECRET_KEY';
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch {
    void res.status(401).json({ error: 'Неверный токен' });
    return;
  }
};

export const sessionAuthMiddleware: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Не авторизован' });
  }
};
