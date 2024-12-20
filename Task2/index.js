const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const sensorReadingRoutes = require('./routes/sensorReadingRoutes');
const reportRoutes = require('./routes/reportRoutes');
const containerRoutes = require('./routes/containerRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Підключення маршрутів
app.use('/api/users', userRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/sensor-readings', sensorReadingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/containers', containerRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});

