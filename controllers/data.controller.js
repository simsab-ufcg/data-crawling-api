/**
 * @author Gabriel Felipe, Matheus Oliveira
 */

'use strict';

var dao = require("../dao/data.dao");

exports.getData = (req, res, next) => {
    res.send(dao.listData(req.query.dataset));
}
