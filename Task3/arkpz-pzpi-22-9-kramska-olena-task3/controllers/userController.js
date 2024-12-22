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
    const [creator] = await User.getById(created_by);

    if (!creator.length || creator[0].role !== 'owner') {
      return res.status(403).json({ message: 'Тільки власник може створювати нових користувачів' });
    }

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



// Оновлення даних користувача
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { initiator_id, username, password, role } = req.body;

  try {
    const [initiator] = await User.getById(initiator_id);

    if (!initiator || initiator.length === 0 || initiator[0].role !== 'owner') {
      return res.status(403).json({ message: 'Тільки власник може оновлювати дані користувачів' });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await User.update(id, username, hashedPassword, role);
    res.status(200).json({ message: 'Користувача успішно оновлено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка оновлення користувача', error: err.message });
  }
};


// видалення користувача
exports.deleteUser = async (req, res) => {
  const { id } = req.params; 
  const { initiator_id } = req.body; 

  try {
    const [initiator] = await User.getById(initiator_id);

    if (!initiator || initiator.length === 0) {
      return res.status(404).json({ message: 'Користувач із вказаним ID ініціатора не знайдений' });
    }

    if (initiator[0].role !== 'owner') {
      return res.status(403).json({ message: 'Тільки власник може видаляти користувачів' });
    }

    const [userToDelete] = await User.getById(id);

    if (!userToDelete || userToDelete.length === 0) {
      return res.status(404).json({ message: 'Користувач із вказаним ID не знайдений' });
    }

    await User.delete(id);
    res.status(200).json({ message: 'Користувача успішно видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення користувача', error: err.message });
  }
};
