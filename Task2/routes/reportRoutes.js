const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/', reportController.getReports);           // отримати всі звіти
router.post('/', reportController.createReport);        // оновити звіт
router.get('/:id', reportController.getReportById);     // отримати по id
router.delete('/:id', reportController.deleteReport);   // видалити

module.exports = router;
