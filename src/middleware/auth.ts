import { RequestHandler } from 'express';

export const sessionAuthMiddleware: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Не авторизован' });
  }
};
