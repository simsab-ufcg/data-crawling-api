'use strict';

const dataController = require('../controllers/data.controller')
const dataSetController = require('../controllers/dataset.controller')


exports.getRoot = (req, res, next) => {
    res.status(400).send('Hello world!');
}

exports.getDataSet = (req, res, next) => {
    if(req.query.dataset){
        dataController.getData(req.query.dataset, (data) => {
            res.send(data);
        });
    }else{
        dataSetController.getDataSets(req, res, next);
    }
}

exports.postDataSet = (req, res, next) => {

    const body = req.body;

    const dataSet = {
        name: body.name,
        created_date: body.created_date,
        updated_date: body.updated_date,
        description: body.description
    };

    const data = body.data;

    const insertDataSetData = (dataSetId) => {
        data.forEach((element) => {
            dataController.postData(dataSetId, element);
        });
        res.send(200);
    };

    dataSetController.postDataSet(dataSet, insertDataSetData);
    
}