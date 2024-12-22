const db = require('../db/connection');

const Container = {
  // отримати всі ємності
  getAll: () => db.promise().query('SELECT * FROM Containers'),

  // додати нову ємність
  create: (name, location, capacity) => {
    return db.promise().query(
      'INSERT INTO Containers (name, location, capacity) VALUES (?, ?, ?)',
      [name, location, capacity]
    );
  },

  // отримати ємність за ID
  getById: (id) => db.promise().query('SELECT * FROM Containers WHERE container_id = ?', [id]),

  // оновлення ємності
  update: (id, name, location, capacity) => {
    return db.promise().query(
      'UPDATE Containers SET name = ?, location = ?, capacity = ? WHERE container_id = ?',
      [name, location, capacity, id]
    );
  },

  // отримати контейнер за іменем
  getByName: (name) => {
    return db.promise().query('SELECT * FROM Containers WHERE name = ?', [name]);
  },

  // видалити ємність
  delete: (id) => db.promise().query('DELETE FROM Containers WHERE container_id = ?', [id]),
};

module.exports = Container;
