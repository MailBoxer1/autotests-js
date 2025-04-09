import { Router, Request, Response } from 'express';
import {
  getAllItems,
  getAllUsers,
  getAllPosts,
  getAllComments,
  getAllFriends,
  getAllMessages,
} from '../db/database.js';

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

export default router;
