var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', usersController.login);

module.exports = router;
