"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = getAllItems;
exports.getAllUsers = getAllUsers;
exports.getAllPosts = getAllPosts;
exports.getAllComments = getAllComments;
exports.getAllFriends = getAllFriends;
exports.getAllMessages = getAllMessages;
exports.createUser = createUser;
exports.getUserByEmail = getUserByEmail;
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    }
    else {
        console.log('Подключено к базе данных SQLite');
        db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`, (err) => {
            if (err) {
                console.error('Ошибка создания таблицы users:', err.message);
            }
            else {
                console.log('Таблица users готова');
            }
        });
    }
});
function getAllItems() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM items', [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function getAllPosts() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM posts', [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function getAllComments() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM comments', [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function getAllFriends() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM friends', [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function getAllMessages() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM messages', [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function createUser(username, email, passwordHash) {
    return new Promise((resolve, reject) => {
        const timestamp = new Date().toISOString();
        db.run('INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [username, email, passwordHash, timestamp, timestamp], function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row || null);
        });
    });
}
