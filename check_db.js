import sqlite3 from 'sqlite3';

const dbPath = 'c:/Users/admin/Desktop/autotests/database.sqlite';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка подключения к базе:', err.message);
    return;
  }
  console.log('Подключено к базе данных:', dbPath);
});

db.serialize(() => {
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error('Ошибка получения таблиц:', err.message);
      return;
    }
    console.log('Список таблиц:');
    tables.forEach((table) => {
      console.log('- ' + table.name);
    });
  });
});

db.close();
