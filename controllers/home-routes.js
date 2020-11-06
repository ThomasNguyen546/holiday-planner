const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, ToDo } = require('../models');

router.get('/', (req, res) => {
  ToDo.findAll({
    attributes: [
      'id',
      'title',
      'contents'
    ]
  })
    .then(dbToDoData => {
      const todo = dbToDoData.map(post => post.get({ plain: true }));
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

module.exports = router;