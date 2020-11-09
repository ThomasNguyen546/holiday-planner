const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const todoRoutes = require('./todo-routes.js');
const recipeRoutes = require('./recipe-routes');

router.use('/users', userRoutes);
router.use('/todo', todoRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;