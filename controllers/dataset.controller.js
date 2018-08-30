/**
 * @author Gabriel Felipe, Matheus Oliveira
 */

 'use strict';

const dao = require("../dao/dataset.dao");

exports.getDataSets = () => {
    return dao.listDataSets();   
};

exports.postDataSet = (dataSet) => {
    return dao.postDataSet(dataSet);
};
