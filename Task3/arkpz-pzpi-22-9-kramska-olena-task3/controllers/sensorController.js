const Sensor = require('../models/Sensor');
const Container = require('../models/Container');
const User = require('../models/User'); 

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

exports.createSensor = async (req, res) => {
  const { sensor_name, sensor_type, location, container_id, created_by } = req.body;
  const validTypes = ['temperature', 'sugar', 'alcohol'];

  if (!validTypes.includes(sensor_type)) {
    return res.status(400).json({
      message: `Некоректний тип сенсора. Доступні типи: ${validTypes.join(', ')}`,
    });
  }

  try {
    const [user] = await User.getById(created_by);
    if (!user || user[0].role !== 'owner') {
      return res.status(403).json({ message: 'Тільки власник може додавати сенсори.' });
    }

    const [container] = await Container.getById(container_id);
    if (!container.length) {
      return res.status(404).json({ message: 'Вказана ємність не існує.' });
    }

    // перевірка чи ємність уже містить сенсор такого типу
    const [existingSensors] = await Sensor.getByContainerId(container_id);
    const sensorExists = existingSensors.some((sensor) => sensor.sensor_type === sensor_type);
    if (sensorExists) {
      return res.status(400).json({ message: 'У ємності вже є сенсор такого типу.' });
    }

    await Sensor.create(sensor_name, sensor_type, location, container_id);
    res.status(201).json({ message: 'Сенсор успішно додано.' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення сенсора.', error: err.message });
  }
};

//видалення
exports.deleteSensor = async (req, res) => {
  const { id } = req.params; 
  const { deleted_by } = req.body; 

  try {
    const [user] = await User.getById(deleted_by);
    if (!user || user[0].role !== 'owner') {
      return res.status(403).json({ message: 'Доступ заборонено. Тільки власник може видаляти сенсори.' });
    }

    const [sensor] = await Sensor.getById(id);
    if (!sensor.length) {
      return res.status(404).json({ message: 'Сенсор не знайдено.' });
    }

    await Sensor.delete(id);
    res.status(200).json({ message: 'Сенсор успішно видалено.' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення сенсора', error: err.message });
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

