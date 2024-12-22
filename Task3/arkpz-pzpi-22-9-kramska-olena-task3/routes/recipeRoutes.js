const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getRecipes);               // отримати всі рецепти
router.post('/', recipeController.createRecipe);            // оновити
router.get('/:id', recipeController.getRecipeById);         // отримати за id
router.put('/:id', recipeController.updateRecipe);          // оновити за id
router.delete('/:id', recipeController.deleteRecipe);       // видалити

module.exports = router;
