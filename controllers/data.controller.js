/**
 * @author Gabriel Felipe, Matheus Oliveira
 */

'use strict';

const dao = require("../dao/data.dao");

exports.getData = (dataset, next) => {
    dao.getData(dataset, next);
}

exports.postData = (dataSetId, data) => {
    dao.postData(dataSetId, data);
}