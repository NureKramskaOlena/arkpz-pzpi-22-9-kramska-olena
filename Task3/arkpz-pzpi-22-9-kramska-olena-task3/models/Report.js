const db = require('../db/connection');

const Report = {
  // отримати всі звіти з деталями про ємність, рецепт і користувача
  getAll: () => {
    return db.promise().query(`
      SELECT 
          r.report_id, 
          r.name, 
          r.content, 
          r.created_at,
          u.username AS generated_by,
          c.name AS container_name, 
          c.location AS container_location, 
          c.capacity,
          rec.name AS recipe_name
      FROM Reports r
      JOIN Users u ON r.generated_by = u.user_id
      LEFT JOIN Containers c ON r.container_id = c.container_id
      LEFT JOIN Recipes rec ON r.recipe_id = rec.recipe_id
    `);
  },

  // Додати новий звіт
  create: (name, generated_by, content, recipe_id, container_id) => {
    return db.promise().query(
      'INSERT INTO Reports (name, generated_by, content, recipe_id, container_id) VALUES (?, ?, ?, ?, ?)',
      [name, generated_by, content, recipe_id, container_id]
    );
  },

  // видалити звіт за ID
  delete: (id) => {
    return db.promise().query('DELETE FROM Reports WHERE report_id = ?', [id]);
  },


  // отримати звіт за ID
  getById: (id) => {
    return db.promise().query('SELECT * FROM Reports WHERE report_id = ?', [id]);
  },

};

module.exports = Report;
