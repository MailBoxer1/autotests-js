# План реализации JWT-аутентификации и middleware для Express

## 1. Установка зависимостей

- Установить пакет для работы с JWT:

```
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

## 2. Генерация JWT при входе пользователя

- В API `/api/login` после успешной проверки пароля:

```typescript
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { userId: user.id, email: user.email },
  'SECRET_KEY', // заменить на секрет из .env
  { expiresIn: '1h' }
);

res.json({ token });
```

- Клиент получает токен и сохраняет его (например, в `localStorage`).

## 3. Middleware для проверки авторизации

- Создать файл `src/middleware/auth.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Нет токена' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY'); // заменить на секрет из .env
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Неверный токен' });
  }
}
```

## 4. Использование middleware

- Импортировать `authMiddleware` в `src/routes/api.ts`.
- Добавить его к защищённым маршрутам, например:

```typescript
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Доступ разрешён', user: (req as any).user });
});
```

## 5. Обновление фронтенда

- При успешном входе сохранять токен:

```typescript
localStorage.setItem('token', data.token);
```

- При последующих запросах добавлять заголовок:

```typescript
fetch('/api/protected', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
});
```

## 6. Хранение секрета

- Вынести `'SECRET_KEY'` в `.env` файл и загружать через `dotenv`:

```
JWT_SECRET=your_secret_key
```

- Использовать `process.env.JWT_SECRET` в коде.

## 7. Итог

- Пользователь получает токен при входе.
- Токен хранится на клиенте.
- Для защищённых маршрутов клиент отправляет токен в заголовке.
- Middleware проверяет токен и разрешает или запрещает доступ.

---

## Следующие шаги

1. Установить зависимости.
2. Создать middleware.
3. Обновить API `/api/login` для генерации токена.
4. Обновить фронтенд для сохранения и передачи токена.
5. Защитить нужные маршруты.
