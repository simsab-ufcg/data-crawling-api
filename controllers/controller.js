'use strict';
var ftpUtil = require('../utils/ftp.util');
var crawler = require('../utils/crawler.util');

exports.getRoot = (req, res, next) => {
    res.status(400).send('Hello world!');
}

exports.connectFtp = (req, res, next) => {
    ftpUtil.connectFtp(req.body.config, res, next);
}

exports.list = (req, res, next) => {
    ftpUtil.listFiles(res);
}

exports.getDataSets = (req, res, next) => {
    crawler.crawlerPage("", req, res);
}