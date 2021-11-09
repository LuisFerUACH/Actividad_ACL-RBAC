const express = require('express');
const controller = require('../controllers/movies.js');
const router = express.Router();


router.post('/', controller.create);

router.get('/:page?', controller.list);

router.get('/show/:id', controller.index);

router.put('/:id', controller.replace);

router.patch('/:id', controller.edit);

router.delete('/:id', controller.destroy);

module.exports = router;
