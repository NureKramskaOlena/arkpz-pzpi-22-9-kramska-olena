const bcrypt = require('bcrypt');
const User = require('../models/User');

//отримання
exports.getUsers = async (req, res) => {
    try {
      const [users] = await User.getAll();
      if (users.length === 0) {
        res.status(200).json({ message: 'Користувачі відсутні' });
      } else {
        res.status(200).json(users);
      }
    } catch (err) {
      res.status(500).json({ message: 'Помилка отримання користувачів', error: err.message });
    }
  };


  exports.createUser = async (req, res) => {
    const { username, password, role, created_by } = req.body;
  
    try {
      // перевірка ролі
      const [creator] = await User.getById(created_by);
  
      if (!creator.length || creator[0].role !== 'owner') {
        return res.status(403).json({ message: 'Тільки власник може створювати нових користувачів' });
      }
  
      // хеш
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await User.create(username, hashedPassword, role, created_by);
  
      res.status(201).json({ message: 'Користувача успішно створено' });
    } catch (err) {
      res.status(500).json({ message: 'Помилка створення користувача', error: err.message });
    }
  };

// отримання по id
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await User.getById(id);
    if (user.length > 0) {
      res.status(200).json(user[0]);
    } else {
      res.status(404).json({ message: 'Користувача не знайдено' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання користувача', error: err.message });
  }
};

//оновлення
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password_hash, role } = req.body;
  try {
    await User.update(id, username, password_hash, role);
    res.status(200).json({ message: 'Користувача успішно оновлено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка оновлення користувача', error: err.message });
  }
};

//видалення
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.delete(id);
    res.status(200).json({ message: 'Користувача успішно видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення користувача', error: err.message });
  }
};
