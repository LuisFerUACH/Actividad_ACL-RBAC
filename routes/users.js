var express = require('express');
var router = express.Router();

const controller = require('../controllers/users');

/* GET users listing. */
router.get('/:page?', controller.list);

router.get('/show/:id', controller.index);

router.post('/', controller.create);

router.put('/:id', controller.replace);

router.patch('/:id', controller.edit);

router.delete('/:id', controller.destroy);

module.exports = router;
