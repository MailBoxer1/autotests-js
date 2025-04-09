import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к базе данных SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite');
  }
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Тестовый маршрут для проверки сервера
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Пример маршрута для получения данных из базы
app.get('/api/items', (_req: Request, res: Response) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err.message);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ data: rows });
    }
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
