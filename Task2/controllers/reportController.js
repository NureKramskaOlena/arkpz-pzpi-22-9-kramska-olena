const Report = require('../models/Report');

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


