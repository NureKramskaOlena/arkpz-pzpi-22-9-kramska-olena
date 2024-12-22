const Sensor = require('../models/Sensor');

// отримання
exports.getSensors = async (req, res) => {
  try {
    const [sensors] = await Sensor.getAll();
    if (sensors.length === 0) {
      res.status(200).json({ message: 'Сенсори відсутні' });
    } else {
      res.status(200).json(sensors);
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання сенсорів', error: err.message });
  }
};

// створення
exports.createSensor = async (req, res) => {
  const { sensor_name, sensor_type, location, container_id } = req.body;
  const validTypes = ['temperature', 'sugar', 'alcohol'];

  if (!validTypes.includes(sensor_type)) {
    return res.status(400).json({
      message: `Некоректний тип сенсора. Доступні типи: ${validTypes.join(', ')}`,
    });
  }

  try {
    await Sensor.create(sensor_name, sensor_type, location, container_id);
    res.status(201).json({ message: 'Сенсор успішно додано' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення сенсора', error: err.message });
  }
};



// торимання по ID
exports.getSensorById = async (req, res) => {
  const { id } = req.params;
  try {
    const [sensor] = await Sensor.getById(id);
    if (sensor.length > 0) {
      res.status(200).json(sensor[0]);
    } else {
      res.status(404).json({ message: 'Сенсор не знайдено' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання сенсора', error: err.message });
  }
};

// видалення
exports.deleteSensor = async (req, res) => {
  const { id } = req.params;
  try {
    await Sensor.delete(id);
    res.status(200).json({ message: 'Сенсор успішно видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення сенсора', error: err.message });
  }
};
