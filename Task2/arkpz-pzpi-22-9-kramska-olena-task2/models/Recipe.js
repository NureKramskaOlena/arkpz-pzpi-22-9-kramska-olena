const db = require('../db/connection');

const Recipe = {
  // Отримати всі рецепти з деталями ємностей
  getAll: () => {
    return db.promise().query(`
      SELECT r.recipe_id, r.name, r.description, r.target_temp, r.target_sugar, r.target_alcohol, r.created_at,
             c.name AS container_name, c.location AS container_location
      FROM Recipes r
      LEFT JOIN Containers c ON r.container_id = c.container_id
    `);
  },

  // Додати новий рецепт
  create: (name, description, target_temp, target_sugar, target_alcohol, created_by, container_id) => {
    return db.promise().query(
      'INSERT INTO recipes (name, description, target_temp, target_sugar, target_alcohol, created_by, container_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, target_temp, target_sugar, target_alcohol, created_by, container_id]
    );
  },
  

  // Оновити рецепт
  update: (id, name, description, target_temp, target_sugar, target_alcohol, container_id) => {
    return db.promise().query(
      `UPDATE recipes 
       SET name = ?, description = ?, target_temp = ?, target_sugar = ?, target_alcohol = ?, container_id = ?
       WHERE recipe_id = ?`,
      [name, description, target_temp, target_sugar, target_alcohol, container_id, id]
    );
  },

  // Отримати рецепт за ID
  getById: (id) => db.promise().query('SELECT * FROM Recipes WHERE recipe_id = ?', [id]),

  // Видалити рецепт
  delete: (id) => db.promise().query('DELETE FROM Recipes WHERE recipe_id = ?', [id]),
};

module.exports = Recipe;
