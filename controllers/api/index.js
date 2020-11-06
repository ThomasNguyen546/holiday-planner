const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const todoRoutes = require('./todo-routes.js');

router.use('/users', userRoutes);
router.use('/todo', todoRoutes);

module.exports = router;