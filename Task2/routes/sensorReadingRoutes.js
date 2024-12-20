const express = require('express');
const router = express.Router();
const sensorReadingController = require('../controllers/sensorReadingController');

router.get('/', sensorReadingController.getReadings);                           // отримати всі зчитування
router.post('/', sensorReadingController.createReading);                        // оновлення
router.get('/:sensor_id', sensorReadingController.getReadingsBySensorId);       // отримати за id

module.exports = router;
