/**
 * Definition of the api routes.
 * 
 * @author Ana Silva
 */
var express = require('express');
var router = express.Router();
var crawler = require('../utils/crawler.util');


/**
 * route that loads the root of the api 
 */
router.get('/', function(req, res) {
  res.status(400).send('Hello world');
});

/**
 *  route that loads all avaliable datasets
 */
router.get('/dataset', function(req, res) {
  crawler.crawlerPage('/', res);
});

router.post('/dataset', function(req, res) {
  console.log(req.body);
  crawler.crawlerPage('/' + req.body.path, res);
});


module.exports = router;