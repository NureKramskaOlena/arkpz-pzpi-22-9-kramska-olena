const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {

    const [user] = await User.getByUsername(username);

    if (!user || user.length === 0) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    res.status(200).json({ message: 'Успішний вхід!', user: { id: user[0].user_id, role: user[0].role } });
  } catch (err) {
    res.status(500).json({ message: 'Помилка під час входу', error: err.message });
  }
};
