const bcrypt = require('bcrypt');
const db = require('../db/connection');

const User = {
  // отримати всіх користувачів
  getAll: () => db.promise().query('SELECT * FROM Users'),

  // додати нового користувача з хешуванням пароля
  create: (username, password_hash, role, created_by) => {
    return db
      .promise()
      .query(
        'INSERT INTO Users (username, password_hash, role, created_by) VALUES (?, ?, ?, ?)',
        [username, password_hash, role, created_by]
      );
  },

  // отримати користувача за ID
  getById: (id) => {
    return db.promise().query('SELECT * FROM Users WHERE user_id = ?', [id]);
  },

  // оновити дані користувача
  update: (id, username, password_hash, role) => {
    return db.promise().query(
      'UPDATE Users SET username = ?, password_hash = ?, role = ? WHERE user_id = ?',
      [username, password_hash, role, id]
    );
  },

  // знайти користувача за ім'ям
  getByUsername: (username) => {
    return db.promise().query('SELECT * FROM Users WHERE username = ?', [username]);
  },

  // видалити користувача
  delete: (id) => db.promise().query('DELETE FROM Users WHERE user_id = ?', [id]),
};

module.exports = User;
