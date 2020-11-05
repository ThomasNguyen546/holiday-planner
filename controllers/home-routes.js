const router = require('express').Router();
const {
  User,
  ToDo
} = require('../models')

router.get('/', (req, res) => {
  ToDo.findAll({
    attributes: [
      'id',
      'title',
      'contents'
    ],
    include: [{
      model: User,
      attributes: ['username']
    }]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({
      plain: true
    }))
  })
  res.render('homepage', {
    posts,
    loggedIn: req.session.loggedIn
  });
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});

router.get('/ToDo/:id', (req, res) => {
  ToDo.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content',
    ],
    include: [{
      model: User,
      attributes: ['username']
    }]
  })
  .then(dbPostData => {
    if(!dbPostData) {
      res.status(404).json({
        message: 'No item found with this ID'
      })
      return;
    }
    res.render('single-todo', {
      todo,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
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