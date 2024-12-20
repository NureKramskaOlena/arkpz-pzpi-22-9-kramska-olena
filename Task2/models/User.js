const bcrypt = require('bcrypt');
const db = require('../db/connection');

const User = {
  // Отримати всіх користувачів
  getAll: () => db.promise().query('SELECT * FROM Users'),

// Додати нового користувача з хешуванням пароля
create: (username, password_hash, role, created_by) => {
  return db
    .promise()
    .query(
      'INSERT INTO Users (username, password_hash, role, created_by) VALUES (?, ?, ?, ?)',
      [username, password_hash, role, created_by]
    );
},

  // Отримати користувача за ID
  getById: (id) => db.promise().query('SELECT * FROM Users WHERE user_id = ?', [id]),

  // Оновити дані користувача
  update: (id, username, password_hash, role) => {
    return db.promise().query(
      'UPDATE Users SET username = ?, password_hash = ?, role = ? WHERE user_id = ?',
      [username, password_hash, role, id]
    );
  },

  // Видалити користувача
  delete: (id) => db.promise().query('DELETE FROM Users WHERE user_id = ?', [id]),
};

module.exports = User;
