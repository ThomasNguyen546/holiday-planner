const router = require('express').Router();
const { Recipe } = require('../../models');

// GET ALL RECIPES
router.get('/', (req, res) => {
  Recipe.findAll({
    order: [['title', 'ASC']]
  })
  .then(dbRecipeData => res.json(dbRecipeData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET SINGLE RECIPE
router.get('/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbRecipeData => {
    if (!dbRecipeData) {
      res.status(404).json({ message: 'No recipe found with this id.'});
      return;
    }
    res.json(dbRecipeData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// CREATE RECIPE
router.post('/', (req, res) => {
  Recipe.create({
    title: req.body.title,
    recipe_url: req.body.recipe_url,
    user_id: req.session.user_id
  })
  .then(dbRecipeData => res.json(dbRecipeData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE RECIPE
router.delete('/:id', (req, res) => {
  Recipe.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbRecipeData => {
    if (!dbRecipeData) {
      res.status(404).json({ message: 'No recipe found with this id.'});
      return;
    }
    res.json(dbRecipeData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;