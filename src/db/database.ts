import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite');
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
