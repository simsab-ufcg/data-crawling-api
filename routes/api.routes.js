var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Home Works');
});

router.get('/dataset', function(req, res) {
  res.send('Dataset works');
});

module.exports = router;