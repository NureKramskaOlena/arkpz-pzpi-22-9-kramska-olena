const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Container = require('../models/Container');


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


// створення рецепту
exports.createRecipe = async (req, res) => {
  const { name, description, target_temp, target_sugar, target_alcohol, created_by, container_id } = req.body;

  try {
    // перевірка, чи користувач є власником
    const [user] = await User.getById(created_by);
    if (!user || user[0].role !== 'owner') {
      return res.status(403).json({ message: 'Доступ заборонено. Тільки власник може додавати рецепти.' });
    }

    // перевірка існування контейнера
    if (container_id) {
      const [container] = await Container.getById(container_id);
      if (!container || container.length === 0) {
        return res.status(404).json({ message: 'Контейнер із вказаним ID не знайдений.' });
      }

      // перевірка, чи контейнер вже прив’язаний до рецепту
      const [existingRecipe] = await Recipe.getByContainerId(container_id);
      if (existingRecipe && existingRecipe.length > 0) {
        return res.status(400).json({ message: 'Контейнер вже прив’язаний до іншого рецепту.' });
      }
    }

    // створення рецепту
    await Recipe.create(name, description, target_temp, target_sugar, target_alcohol, created_by, container_id);
    res.status(201).json({ message: 'Рецепт успішно створено.' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення рецепту.', error: err.message });
  }
};


//оновлення
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, description, target_temp, target_sugar, target_alcohol, container_id, updated_by } = req.body;

  try {
    // перевірка, чи користувач є власником
    const [user] = await User.getById(updated_by);
    if (!user || user[0].role !== 'owner') {
      return res.status(403).json({ message: 'Тільки власник може оновлювати рецепти.' });
    }

    // перевірка існування рецепта
    const [recipe] = await Recipe.getById(id);
    if (!recipe.length) {
      return res.status(404).json({ message: 'Рецепт не знайдено.' });
    }

    // перевірка існування контейнера
    const [container] = await Container.getById(container_id);
    if (!container.length) {
      return res.status(404).json({ message: 'Вказаний контейнер не існує.' });
    }

    // перевірка, чи контейнер не зайнятий іншим рецептом
    const [existingRecipe] = await Recipe.getByContainerId(container_id);
    if (existingRecipe.length && existingRecipe[0].recipe_id !== parseInt(id)) {
      return res.status(400).json({
        message: 'Контейнер вже прив’язаний до іншого рецепта.',
      });
    }

    await Recipe.update(id, name, description, target_temp, target_sugar, target_alcohol, container_id);
    res.status(200).json({ message: 'Рецепт успішно оновлено.' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка оновлення рецепту.', error: err.message });
  }
};


// видалення рецепту
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { deleted_by } = req.body;

  try {
    // перевірка, чи користувач є власником
    const [user] = await User.getById(deleted_by);
    if (!user || user[0].role !== 'owner') {
      return res.status(403).json({ message: 'Доступ заборонено. Тільки власник може видаляти рецепти.' });
    }

    // перевірка існування рецепту
    const [recipe] = await Recipe.getById(id);
    if (!recipe || recipe.length === 0) {
      return res.status(404).json({ message: 'Рецепт із вказаним ID не знайдено.' });
    }

    // видалення рецепту
    await Recipe.delete(id);
    res.status(200).json({ message: 'Рецепт успішно видалено.' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення рецепту.', error: err.message });
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
