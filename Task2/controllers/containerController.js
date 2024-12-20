const Container = require('../models/Container');

//отримання
exports.getContainers = async (req, res) => {
    try {
      const [containers] = await Container.getAll();  
      if (containers.length === 0) {
        return res.status(200).json({ message: 'Ємності відсутні' });
      }
      res.status(200).json(containers);
    } catch (err) {
      res.status(500).json({ message: 'Помилка отримання ємностей', error: err.message });
    }
  };
 
//створення  
exports.createContainer = async (req, res) => {
  const { name, location, capacity } = req.body;

  try {
    await Container.create(name, location, capacity);
    res.status(201).json({ message: 'Ємність успішно створено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення ємності', error: err.message });
  }
};

// оновлення ємності
exports.updateContainer = async (req, res) => {
  const { id } = req.params;
  const { name, location, capacity } = req.body; 

  try {
    const result = await Container.update(id, name, location, capacity); 
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ємність не знайдено' });
    }
    res.status(200).json({ message: 'Ємність успішно оновлено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка оновлення ємності', error: err.message });
  }
};

// видалення ємності
exports.deleteContainer = async (req, res) => {
  const { id } = req.params; 

  try {
    const result = await Container.delete(id); 
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ємність не знайдено' });
    }
    res.status(200).json({ message: 'Ємність успішно видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення ємності', error: err.message });
  }
};
