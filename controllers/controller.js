'use strict';
var crawler = require('../utils/crawler.util');

exports.getRoot = (req, res, next) => {
    res.status(400).send('Hello world!');
}

exports.getDataSets = (req, res, next) => {
    crawler.crawlerPage("", req, res);
}