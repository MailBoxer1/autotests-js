"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionAuthMiddleware = void 0;
const sessionAuthMiddleware = (req, res, next) => {
    if (req.session.userId) {
        next();
    }
    else {
        res.status(401).json({ error: 'Не авторизован' });
    }
};
exports.sessionAuthMiddleware = sessionAuthMiddleware;
