'use strict';
var ftpUtil = require('../utils/ftp.util');
var crawler = require('../utils/crawler.util');

exports.getRoot = (req, res, next) => {
    res.status(400).send('Hello world!');
}

exports.getAllDataSets = (req, res, next) => {
    crawler.crawlerPage('/', res);
}

exports.getSpecificDataSets = (req, res, next) => {
    crawler.crawlerPage('/' + req.body.path, res); 
}

exports.connectFtp = (req, res, next) => {
    ftpUtil.connectFtp(req.body.config, res, next);
}
