const Recipe = require('../models/Recipe');
const User = require('../models/User');

// отримання
exports.getRecipes = async (req, res) => {
  try {
    const [recipes] = await Recipe.getAll();
    if (recipes.length === 0) {
      res.status(200).json({ message: 'Рецепти відсутні' });
    } else {
      res.status(200).json(recipes);
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання рецептів', error: err.message });
  }
};

// створення
exports.createRecipe = async (req, res) => {
  const { name, description, target_temp, target_sugar, target_alcohol, created_by, container_id } = req.body;
  try {
    // перевірка на власника
    const [user] = await User.getById(created_by);
    if (!user || user[0].role !== 'owner') {
      return res.status(403).json({ message: 'Доступ заборонено. Тільки власник може додавати рецепти.' });
    }
    await Recipe.create(name, description, target_temp, target_sugar, target_alcohol, created_by, container_id);
    res.status(201).json({ message: 'Рецепт успішно створено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення рецепту', error: err.message });
  }
};

// отримання по ID
exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [recipe] = await Recipe.getById(id);
    if (recipe.length > 0) {
      res.status(200).json(recipe[0]);
    } else {
      res.status(404).json({ message: 'Рецепт не знайдено' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання рецепту', error: err.message });
  }
};

// оновлення
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, description, target_temp, target_sugar, target_alcohol, container_id } = req.body;
  try {
    await Recipe.update(id, name, description, target_temp, target_sugar, target_alcohol, container_id);
    res.status(200).json({ message: 'Рецепт успішно оновлено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка оновлення рецепту', error: err.message });
  }
};

// Ввидалення
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.delete(id);
    res.status(200).json({ message: 'Рецепт успішно видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення рецепту', error: err.message });
  }
};
