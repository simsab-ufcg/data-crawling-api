/**
 * Definition of the api routes.
 * 
 * @author Ana Silva
 */
var express = require('express');
var router = express.Router();

/**
 * route that loads the root of the api 
 */
router.get('/', function(req, res) {
  res.send('API route Works');
});

/**
 *  route that loads all avaliable datasets
 */
router.get('/dataset', function(req, res) {
  res.send('Dataset works');
});

module.exports = router;