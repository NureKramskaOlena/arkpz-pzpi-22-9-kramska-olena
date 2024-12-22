const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);            // отримати всіх користувачів
router.post('/', userController.createUser);         // створити 
router.get('/:id', userController.getUserById);      // отримати за ID
router.put('/:id', userController.updateUser);       // оновити 
router.delete('/:id', userController.deleteUser);    // видалити 

module.exports = router;
