'use strict';

exports.getRoot = (req, res, next) => {
    res.send('API route Works');
}

exports.getAllDataSets = (req, res, next) => {
    res.send('Dataset works');
}
