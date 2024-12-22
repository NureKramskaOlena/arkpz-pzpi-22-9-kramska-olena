const db = require('../db/connection');

const Recipe = {
  // отримати всі рецепти з деталями ємностей
  getAll: () => {
    return db.promise().query(`
      SELECT r.recipe_id, r.name, r.description, r.target_temp, r.target_sugar, r.target_alcohol, r.created_at,
             c.name AS container_name, c.location AS container_location
      FROM Recipes r
      LEFT JOIN Containers c ON r.container_id = c.container_id
    `);
  },

  // додати новий рецепт
  create: (name, description, target_temp, target_sugar, target_alcohol, created_by, container_id) => {
    return db.promise().query(
      'INSERT INTO recipes (name, description, target_temp, target_sugar, target_alcohol, created_by, container_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, target_temp, target_sugar, target_alcohol, created_by, container_id]
    );
  },


  // оновити рецепт
  update: (id, name, description, target_temp, target_sugar, target_alcohol, container_id) => {
    return db.promise().query(
      `UPDATE recipes 
       SET name = ?, description = ?, target_temp = ?, target_sugar = ?, target_alcohol = ?, container_id = ?
       WHERE recipe_id = ?`,
      [name, description, target_temp, target_sugar, target_alcohol, container_id, id]
    );
  },

  // отримати рецепт за ID
  getById: (id) => db.promise().query('SELECT * FROM Recipes WHERE recipe_id = ?', [id]),

  // видалити рецепт
  delete: (id) => db.promise().query('DELETE FROM Recipes WHERE recipe_id = ?', [id]),

  // отримати рецепт за ID контейнера
  getByContainerId: (container_id) =>
    db.promise().query('SELECT * FROM Recipes WHERE container_id = ?', [container_id]),

};

module.exports = Recipe;
