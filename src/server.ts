process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import session from 'express-session';
// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Настройка сессий
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Для разработки, в проде secure: true
  })
);

// Основные API-роуты
app.use('/api', apiRouter);

// Тестовый маршрут
app.get('/api/test', (_req, res) => {
  res.json({ status: 'OK', message: 'Сервер работает!' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;
