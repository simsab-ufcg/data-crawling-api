/**
 * Definition of the api routes.
 * 
 * @author Ana Silva
 */
var express = require('express');
var router = express.Router();
var controller = require('./../controllers/controller')

/**
 * route that loads the root of the api 
 */

router.get('/', controller.getRoot);

/**
 *  route that loads all avaliable datasets
 */

router.get('/dataset', controller.getDataSets);

module.exports = router;