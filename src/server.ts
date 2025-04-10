import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Redis client
const redisClient = createClient();

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true если HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 час
    }
  })
);

// Подключение API маршрутов
app.use('/api', apiRouter);

 // Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;
