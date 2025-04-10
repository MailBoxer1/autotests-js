import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite');

    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Ошибка создания таблицы users:', err.message);
        } else {
          console.log('Таблица users готова');
        }
      }
    );
  }
});

export function getAllItems(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getAllUsers(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getAllPosts(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getAllComments(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM comments', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getAllFriends(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM friends', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getAllMessages(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM messages', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function createUser(username: string, email: string, passwordHash: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString();
    db.run(
      'INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [username, email, passwordHash, timestamp, timestamp],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export function getUserByEmail(email: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
}
