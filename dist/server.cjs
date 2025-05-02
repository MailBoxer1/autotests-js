"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_js_1 = __importDefault(require("./routes/api.js"));
const express_session_1 = __importDefault(require("express-session"));
// import { RedisStore } from 'connect-redis';
// import { createClient } from 'redis';
// Загрузка переменных окружения
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// --- Redis временно отключен ---
// const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
// console.log('Подключение к Redis по адресу:', redisUrl);
// const redisClient = createClient({ url: redisUrl });
// redisClient.connect().catch((err) => {
//   console.error('Ошибка подключения к Redis:', err);
// });
// const redisStore = new RedisStore({
//   client: redisClient
// });
// --- конец блока Redis ---
// Middleware
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    // store: redisStore, // временно отключено
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true если HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 час
    }
}));
// Подключение API маршрутов
app.use('/api', api_js_1.default);
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
exports.default = app;
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
console.log('Серверный файл загружен, инициализация началась');
