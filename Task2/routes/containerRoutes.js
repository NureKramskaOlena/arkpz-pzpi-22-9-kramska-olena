const express = require('express');
const router = express.Router();
const containerController = require('../controllers/containerController');

router.get('/', containerController.getContainers);             // отримати всі ємності
router.post('/', containerController.createContainer);          // оновити дані ємності
router.put('/:id', containerController.updateContainer);        // оновити ємність
router.delete('/:id', containerController.deleteContainer);     // видалити

module.exports = router;
