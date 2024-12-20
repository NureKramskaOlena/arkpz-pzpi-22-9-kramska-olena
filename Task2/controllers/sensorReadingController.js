const SensorReading = require('../models/SensorReading');

// отримання
exports.getReadings = async (req, res) => {
  try {
    const [readings] = await SensorReading.getAll();
    if (readings.length === 0) {
      res.status(200).json({ message: 'Показники сенсорів відсутні' });
    } else {
      res.status(200).json(readings);
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання показників сенсорів', error: err.message });
  }
};

// додавання
exports.createReading = async (req, res) => {
  const { sensor_id, value, recipe_id } = req.body;

  try {
    await SensorReading.create(sensor_id, value, recipe_id);
    res.status(201).json({ message: 'Зчитування успішно додано' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка додавання зчитування', error: err.message });
  }
};

// отримання по ID
exports.getReadingsBySensorId = async (req, res) => {
  const { sensor_id } = req.params;

  try {
    const [readings] = await SensorReading.getBySensorId(sensor_id);
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання зчитувань сенсора', error: err.message });
  }
};
