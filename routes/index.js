var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/phone.html', function (req, res) {
  res.render('phone');
});
router.get('/brand.html', function (req, res) {
  res.render('brand');
});
router.get('/user.html', function (req, res) {
  res.render('user');
});
router.get('/info.html', function (req, res) {
  res.render('info');
});

module.exports = router;
