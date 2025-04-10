# План по интеграции Redis для хранения уникальных сессий пользователей

---

## 1. Запуск Redis сервера

- Использовать Docker:
  ```
  docker run -d --name redis-server -p 6379:6379 redis
  ```
- Проверить подключение:
  ```
  redis-cli ping
  ```
  должно вернуть `PONG`

---

## 2. Установка npm пакетов

```bash
npm install express-session connect-redis redis
```

---

## 3. Подключение Redis клиента в проекте

```js
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';

const RedisStore = connectRedis(session);
const redisClient = createClient();

redisClient.connect().catch(console.error);
```

---

## 4. Настройка `express-session` с Redis

В `src/server.ts` добавить:

```js
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true если HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 час
    }
  })
);
```

---

## 5. Генерация и хранение уникальных сессий

- При успешной аутентификации (логин) в `req.session` сохранять данные пользователя:

```js
req.session.userId = user.id;
req.session.email = user.email;
req.session.role = user.role;
```

- Для проверки авторизации использовать middleware:

```js
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Не авторизован' });
  }
}
```

---

## 6. Использование сессий в API

- Для защищённых маршрутов использовать `isAuthenticated`.
- Внутри обработчиков получать `req.session.userId` для идентификации пользователя.

---

## 7. Выход пользователя

- Для выхода вызвать:

```js
req.session.destroy();
res.clearCookie('connect.sid');
```

---

## 8. Тестирование

- Проверить, что после логина создаётся уникальная сессия.
- Проверить, что разные пользователи имеют разные сессии.
- Проверить, что после выхода сессия уничтожается.
- Проверить, что без сессии доступ к защищённым API запрещён.

---

## 9. Безопасность и рекомендации

- Использовать `cookie: { secure: true }` на проде (только HTTPS).
- Использовать длинный и сложный `secret`.
- Настроить TTL для сессий (например, 1 час).
- Можно хранить refresh токены в Redis для JWT.
- Для масштабирования использовать Redis Cluster.

---

## 10. Итог

- Redis позволит хранить уникальные сессии для каждого пользователя.
- Это обеспечит безопасную и масштабируемую авторизацию.
- Можно легко инвалидировать сессии (logout на всех устройствах).
