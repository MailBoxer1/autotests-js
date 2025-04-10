import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  getAllItems,
  getAllUsers,
  getAllPosts,
  getAllComments,
  getAllFriends,
  getAllMessages,
  createUser,
} from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Тестовый маршрут для проверки сервера
router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Получение всех items
router.get('/items', async (_req: Request, res: Response) => {
  try {
    const rows = await getAllItems();
    res.json({ data: rows });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Получение всех пользователей
router.get('/users', async (_req: Request, res: Response) => {
  try {
    const rows = await getAllUsers();
    res.json({ data: rows });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Получение всех постов
router.get('/posts', async (_req: Request, res: Response) => {
  try {
    const rows = await getAllPosts();
    res.json({ data: rows });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Получение всех комментариев
router.get('/comments', async (_req: Request, res: Response) => {
  try {
    const rows = await getAllComments();
    res.json({ data: rows });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Получение всех друзей
router.get('/friends', async (_req: Request, res: Response) => {
  try {
    const rows = await getAllFriends();
    res.json({ data: rows });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Получение всех сообщений
router.get('/messages', async (_req: Request, res: Response) => {
  try {
    const rows = await getAllMessages();
    res.json({ data: rows });
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/register', (req: Request, res: Response, next) => {
  void (async () => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Все поля обязательны' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Пароль должен содержать минимум 6 символов' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      await createUser(username, email, passwordHash);

      res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (err: any) {
      console.error('Ошибка регистрации:', err);
      if (err.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      } else {
        res.status(500).json({ error: 'Ошибка сервера' });
      }
    }
  })().catch(next);
});

router.post('/login', (req: Request, res: Response, next) => {
  void (async () => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
      }

      const user = await import('../db/database.js').then(m => m.getUserByEmail(email));
      console.log('Пользователь из базы:', user);
      if (!user) {
        return res.status(400).json({ error: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Неверный пароль' });
      }

      const secret = process.env.JWT_SECRET || 'SECRET_KEY';
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        secret,
        { expiresIn: '1h' }
      );
      console.log('Выдан токен:', token);
      res.status(200).json({ token });
    } catch (err) {
      console.error('Ошибка входа:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  })().catch(next);
});

router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Доступ разрешён', user: (req as any).user });
});

export default router;
