"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_js_1 = require("../db/database.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Тестовый маршрут для проверки сервера
router.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// Получение всех items
router.get('/items', async (_req, res) => {
    try {
        const rows = await (0, database_js_1.getAllItems)();
        res.json({ data: rows });
    }
    catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Получение всех пользователей
router.get('/users', async (_req, res) => {
    try {
        const rows = await (0, database_js_1.getAllUsers)();
        res.json({ data: rows });
    }
    catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Получение всех постов
router.get('/posts', async (_req, res) => {
    try {
        const rows = await (0, database_js_1.getAllPosts)();
        res.json({ data: rows });
    }
    catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Получение всех комментариев
router.get('/comments', async (_req, res) => {
    try {
        const rows = await (0, database_js_1.getAllComments)();
        res.json({ data: rows });
    }
    catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Получение всех друзей
router.get('/friends', async (_req, res) => {
    try {
        const rows = await (0, database_js_1.getAllFriends)();
        res.json({ data: rows });
    }
    catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
// Получение всех сообщений
router.get('/messages', async (_req, res) => {
    try {
        const rows = await (0, database_js_1.getAllMessages)();
        res.json({ data: rows });
    }
    catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
router.post('/register', (req, res, next) => {
    void (async () => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ error: 'Все поля обязательны' });
            }
            if (password.length < 6) {
                return res.status(400).json({ error: 'Пароль должен содержать минимум 6 символов' });
            }
            const passwordHash = await bcryptjs_1.default.hash(password, 10);
            await (0, database_js_1.createUser)(username, email, passwordHash);
            console.log(`Зарегистрирован новый пользователь: ${username}, ${email}`);
            res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
        }
        catch (err) {
            console.error('Ошибка регистрации:', err);
            if (err.message.includes('UNIQUE constraint failed')) {
                res.status(400).json({ error: 'Пользователь с таким email уже существует' });
            }
            else {
                res.status(500).json({ error: 'Ошибка сервера' });
            }
        }
    })().catch(next);
});
router.post('/login', (req, res, next) => {
    void (async () => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email и пароль обязательны' });
            }
            const user = await Promise.resolve().then(() => __importStar(require('../db/database.js'))).then(m => m.getUserByEmail(email));
            console.log('Пользователь из базы:', user);
            if (!user) {
                return res.status(400).json({ error: 'Пользователь не найден' });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ error: 'Неверный пароль' });
            }
            // Сохраняем данные пользователя в сессию
            req.session.userId = user.id;
            req.session.email = user.email;
            req.session.role = user.role; // если есть
            console.log(`Пользователь вошёл: ${user.email}, id=${user.id}`);
            res.status(200).json({ message: 'Вход выполнен успешно' });
        }
        catch (err) {
            console.error('Ошибка входа:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    })().catch(next);
});
router.get('/profile', auth_js_1.sessionAuthMiddleware, (req, res) => {
    res.json({ message: 'Доступ разрешён', userId: req.session.userId, email: req.session.email });
});
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Ошибка при уничтожении сессии:', err);
            return res.status(500).json({ error: 'Ошибка выхода' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Вы успешно вышли' });
    });
});
exports.default = router;
