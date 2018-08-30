/**
 * @author Gabriel Felipe, Matheus Oliveira
 */

'use strict';

const dao = require("../dao/data.dao");

exports.getData = (dataset) => {
    return dao.getData(dataset);
}

exports.postData = (dataSetId, data) => {
    return dao.postData(dataSetId, data);
}