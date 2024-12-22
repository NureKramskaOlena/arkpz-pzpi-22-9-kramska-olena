const db = require('../db/connection');

const SensorReading = {
  getAll: (sensor_id, recipe_id) => {
    let query = `
      SELECT sr.reading_id, sr.sensor_id, s.sensor_name, sr.value, sr.timestamp, sr.recipe_id, 
             r.name AS recipe_name
      FROM SensorReadings sr
      JOIN Sensors s ON sr.sensor_id = s.sensor_id
      LEFT JOIN Recipes r ON sr.recipe_id = r.recipe_id
    `;
    const params = [];

    if (sensor_id) {
      query += ' WHERE sr.sensor_id = ?';
      params.push(sensor_id);
    }
    if (recipe_id) {
      query += sensor_id ? ' AND sr.recipe_id = ?' : ' WHERE sr.recipe_id = ?';
      params.push(recipe_id);
    }

    return db.promise().query(query, params);
  },

  create: (sensor_id, value, recipe_id) => {
    return db.promise().query(
      'INSERT INTO SensorReadings (sensor_id, value, recipe_id) VALUES (?, ?, ?)',
      [sensor_id, value, recipe_id]
    );
  },

  delete: (id) => {
    return db.promise().query('DELETE FROM SensorReadings WHERE reading_id = ?', [id]);
  },
};

module.exports = SensorReading;
