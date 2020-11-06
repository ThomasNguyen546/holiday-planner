const router = require('express').Router();
const {
    User,
    ToDo
} = require('../../models');
const { post } = require('../home-routes');

//Get all posts
router.get('/', (req, res) => {
    ToDo.findAll({
        attributes: ['id', 'title', 'contents'],
    })
    .then ((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
});

//Updata a ToDo
router.put('/:id', (req, res) => {
    ToDo.update({
        where: {
            id: req.params.id,
        },
    })
    .then((dbPostData) => {
        if(!dbPostData) {}
    })
})