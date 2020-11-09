const router = require('express').Router();
const {
  // User,
  ToDo
} = require('../models')


router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('login')
  }
  ToDo.findAll({
    attributes: [
      'id',
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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('*', (req, res) => {
  res.status(404).send("Can't go there!");
})

module.exports = router;