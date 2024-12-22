const db = require('../db/connection');

const Container = {
  // Отримати всі ємності
  getAll: () => db.promise().query('SELECT * FROM Containers'),

  // Додати нову ємність
  create: (name, location, capacity) => {
    return db.promise().query(
      'INSERT INTO Containers (name, location, capacity) VALUES (?, ?, ?)',
      [name, location, capacity]
    );
  },

  // Отримати ємність за ID
  getById: (id) => db.promise().query('SELECT * FROM Containers WHERE container_id = ?', [id]),

  // Оновлення ємності
  update: (id, name, location, capacity) => {
    return db.promise().query(
      'UPDATE Containers SET name = ?, location = ?, capacity = ? WHERE container_id = ?',
      [name, location, capacity, id]
    );
  },

  // Видалити ємність
  delete: (id) => db.promise().query('DELETE FROM Containers WHERE container_id = ?', [id]),
};

module.exports = Container;
