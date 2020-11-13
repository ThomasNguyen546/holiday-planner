const router = require('express').Router();
const {
  User,
  ToDo, 
  Recipe
} = require('../models')

// RENDER HOMEPAGE W/ LISTED TO-DOS
router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('login')
  }
  ToDo.findAll({
    attributes: [
      'id',
      'type',
      'title',
      'contents'
    ],
  },
  {
    where: {
      user_id: req.session.id
    }
  }
  )
    .then(dbToDoData => {
      const todos = dbToDoData.map(todo => todo.get({ plain: true }));
      res.render('homepage', {
        todos,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// RENDER LOGIN PAGE
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// RENDER SIGNUP PAGE
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// RENDER SEARCH RECIPE PAGE
router.get('/search-recipes', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('search-recipes', {
    loggedIn: req.session.loggedIn
  });
});

// RENDER SAVED RECIPE PAGE
router.get('/saved-recipes', (req, res) => {
  Recipe.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'title', 'recipe_url']
  })

  .then(dbRecipeData => {
    const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
    res.render('saved-recipes', {recipes, loggedIn: true});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// RENDER SEARCH RECIPE PAGE
router.get('/recipe-results', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('recipe-results', {
    loggedIn: req.session.loggedIn
  });
});



// router.get('*', (req, res) => {
//   res.status(404).send("Can't go there!");
// })

module.exports = router;