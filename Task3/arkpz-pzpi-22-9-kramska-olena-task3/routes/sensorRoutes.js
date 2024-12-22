const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');


router.get('/', sensorController.getSensors);               // отримати всі сенсори
router.post('/', sensorController.createSensor);            // оновити дані
router.get('/:id', sensorController.getSensorById);         // отримати за id
router.delete('/:id', sensorController.deleteSensor);       // видалити

module.exports = router;
