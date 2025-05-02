"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_js_1 = require("./auth.js");
(0, vitest_1.describe)('sessionAuthMiddleware', () => {
    (0, vitest_1.it)('возвращает 401 если пользователь не авторизован', () => {
        const req = { session: {} };
        const res = { status: vitest_1.vi.fn().mockReturnThis(), json: vitest_1.vi.fn() };
        const next = vitest_1.vi.fn();
        (0, auth_js_1.sessionAuthMiddleware)(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(401);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ error: 'Не авторизован' });
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('вызывает next если пользователь авторизован', () => {
        const req = { session: { userId: 1 } };
        const res = { status: vitest_1.vi.fn().mockReturnThis(), json: vitest_1.vi.fn() };
        const next = vitest_1.vi.fn();
        (0, auth_js_1.sessionAuthMiddleware)(req, res, next);
        (0, vitest_1.expect)(next).toHaveBeenCalled();
    });
});
