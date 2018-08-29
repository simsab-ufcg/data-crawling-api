'use strict';

var data = require('../controllers/data.controller')
var dataset = require('../controllers/dataset.controller')


exports.getRoot = (req, res, next) => {
    res.status(400).send('Hello world!');
}

exports.dataset = (req, res, next) => {
    if(req.query.dataset){
        data.getData(req, res, next);
    }else{
        dataset.getDataSets(req, res, next);
    }
}