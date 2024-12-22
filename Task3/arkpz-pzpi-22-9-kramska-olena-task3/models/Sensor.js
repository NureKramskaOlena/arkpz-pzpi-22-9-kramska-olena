const db = require('../db/connection');

const Sensor = {
  // отримати всі сенсори з деталями ємностей
  getAll: () => {
    return db.promise().query(`
      SELECT s.sensor_id, s.sensor_name, s.sensor_type, s.location, s.created_at, 
             c.name AS container_name, c.location AS container_location
      FROM Sensors s
      LEFT JOIN Containers c ON s.container_id = c.container_id
    `);
  },

  // додати новий сенсор
  create: (sensor_name, sensor_type, location, container_id) => {
    return db.promise().query(
      'INSERT INTO Sensors (sensor_name, sensor_type, location, container_id) VALUES (?, ?, ?, ?)',
      [sensor_name, sensor_type, location, container_id]
    );
  },

  // отримати сенсор за ID
  getById: (id) => db.promise().query('SELECT * FROM Sensors WHERE sensor_id = ?', [id]),


  // отримати сенсори для певної ємності
  getByContainerId: (container_id) => {
    return db.promise().query('SELECT * FROM Sensors WHERE container_id = ?', [container_id]);
  },

  // Видалити сенсор
  delete: (id) => db.promise().query('DELETE FROM Sensors WHERE sensor_id = ?', [id]),
};

module.exports = Sensor;
