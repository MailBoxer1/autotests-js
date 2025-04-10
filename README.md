# Vue + Express Fullstack App

## Описание
Полноценное fullstack-приложение на Vue 3 + Vite + TypeScript + Express + SQLite. Включает API, графики, автотесты и реалистичные тестовые данные.

## Технологии
- **Frontend:** Vue 3, Vite, TypeScript, Vue Router, Chart.js, vue-chartjs
- **Backend:** Express, SQLite, dotenv, cors, morgan
- **Тестирование:** Vitest, @testing-library/vue, Cypress
- **Dev tools:** ts-node, nodemon, GitHub CLI

## Возможности
- API для работы с пользователями, постами, комментариями, друзьями, сообщениями
- Компонент Panel с графиками по данным из базы
- Реалистичные тестовые данные
- Автоматические тесты компонентов
- Разделение backend и frontend
- Поддержка переменных окружения

## Установка
```bash
git clone https://github.com/MailBoxer1/autotests-js.git
cd autotests-js
npm install
```

## Запуск разработки
- Backend:
```bash
npm run server
```
- Frontend:
```bash
npm run dev
```
Откройте [http://localhost:5173](http://localhost:5173)

## Сборка
```bash
npm run build
```

## Тесты
```bash
npx vitest run
```

## Структура проекта
```
├── src/
│   ├── components/       # Vue компоненты
│   ├── db/               # Работа с базой данных
│   ├── routes/           # API маршруты
│   ├── App.vue           # Корневой компонент
│   ├── main.ts           # Точка входа frontend
│   ├── router.ts         # Vue Router
│   └── server.ts         # Backend сервер
├── database.sqlite       # База данных SQLite
├── populate_realistic_data.sql # Скрипт наполнения базы
├── .env                  # Переменные окружения
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

## Контакты
Автор: MailBoxer1  
[GitHub Repository](https://github.com/MailBoxer1/autotests-js)
