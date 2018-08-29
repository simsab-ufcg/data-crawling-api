/**
 * @author Gabriel Felipe, Matheus Oliveira
 */

 'use strict';

const dao = require("../dao/dataset.dao");

exports.getDataSets = (req, res, next) => {
    const callback = (result) => {
        res.send(result);
    };
    dao.listDataSets(callback);   
};

exports.postDataSet = (dataSet, next) => {
    dao.postDataSet(dataSet, next);
};
