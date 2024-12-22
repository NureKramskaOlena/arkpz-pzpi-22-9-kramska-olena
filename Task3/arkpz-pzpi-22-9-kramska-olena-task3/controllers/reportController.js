const Report = require('../models/Report');
const fs = require('fs');
const path = require('path');
const db = require('../db/connection');

// отримання
exports.getReports = async (req, res) => {
  try {
    const [reports] = await Report.getAll();
    if (reports.length === 0) {
      res.status(200).json({ message: 'Звіти відсутні' });
    } else {
      res.status(200).json(reports);
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання звітів', error: err.message });
  }
};

// додавання
exports.createReport = async (req, res) => {
  const { name, generated_by, content, recipe_id, container_id } = req.body;

  try {
    if (!name || !generated_by || !content) {
      return res.status(400).json({
        message: "Обов'язкові поля: name, generated_by, content.",
      });
    }
    const validRecipeId = recipe_id ? recipe_id : null;
    const validContainerId = container_id ? container_id : null;

    await Report.create(name, generated_by, content, validRecipeId, validContainerId);
    res.status(201).json({ message: 'Звіт успішно створено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення звіту', error: err.message });
  }
};

// отримання по ID
exports.getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const [report] = await Report.getById(id);
    if (report.length > 0) {
      res.status(200).json(report[0]);
    } else {
      res.status(404).json({ message: 'Звіт не знайдено' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання звіту', error: err.message });
  }
};

// видалення
exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const [report] = await Report.getById(id);

    if (report.length === 0) {
      return res.status(404).json({ message: 'Звіт не знайдено' });
    }
    await Report.delete(id);
    res.status(200).json({ message: 'Звіт успішно видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення звіту', error: err.message });
  }
};


// створення текстового файлу звіту
exports.generateReportFile = async (req, res) => {
  const { id } = req.params;

  try {
    const [report] = await db.promise().query(`
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
          WHERE r.report_id = ?
      `, [id]);

    if (report.length === 0) {
      return res.status(404).json({ message: 'Звіт не знайдено' });
    }

    const reportDetails = report[0];

    const fileContent = `
Звіт №${reportDetails.report_id}
Назва звіту: ${reportDetails.name}
Дата створення: ${new Date(reportDetails.created_at).toLocaleString()}
Автор звіту: ${reportDetails.generated_by}

Деталі контейнера:
Назва: ${reportDetails.container_name || 'Не вказано'}
Локація: ${reportDetails.container_location || 'Не вказано'}
Місткість: ${reportDetails.capacity || 'Не вказано'}

Деталі рецепту:
Назва: ${reportDetails.recipe_name || 'Не вказано'}

Зміст звіту:
${reportDetails.content}
      `.trim();

    const filePath = path.join(__dirname, '../downloads', `report_${id}.txt`);

    fs.writeFileSync(filePath, fileContent, 'utf8');
    res.download(filePath, `report_${id}.txt`, (err) => {
      if (err) {
        console.error('Помилка при завантаженні файлу:', err.message);
        return res.status(500).json({ message: 'Помилка при завантаженні файлу' });
      }
      // fs.unlinkSync(filePath);
    });

  } catch (err) {
    console.error('Помилка створення текстового звіту:', err.message);
    res.status(500).json({ message: 'Помилка створення текстового звіту', error: err.message });
  }
};
