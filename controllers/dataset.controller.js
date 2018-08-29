/**
 * @author Gabriel Felipe, Matheus Oliveira
 */

 'use strict';

var dao = require("../dao/dataset.dao");

exports.getDataSets = (req, res, next) => {
    res.send(dao.listDatasets());
}
