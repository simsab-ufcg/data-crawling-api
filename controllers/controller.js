'use strict';

const dataController = require('../controllers/data.controller')
const dataSetController = require('../controllers/dataset.controller')


exports.getRoot = (req, res, next) => {
    res.status(400).send('Hello world!');
}

exports.getDataSet = (req, res, next) => {
    if(req.query.dataset){
        dataController.getData(req.query.dataset)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(400).send('');
            });
    }else{
        dataSetController.getDataSets()
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(400).send('');
            });
    }
}

exports.postDataSet = (req, res, next) => {

    const body = req.body;

    const dataSet = {
        name: body.name,
        created_at: body.created_at,
        updated_at: body.updated_at,
        description: body.description
    };

    const data = body.data;

    dataSetController.postDataSet(dataSet)
        .then((dataSetId) => {
            
            const ndata = data.map((element) => {
                return dataController.postData(dataSetId, element);
            });

            Promise.all(ndata)
            .then(() => {
                res.status(200).send();
            }).catch((err) => {
                res.status(400).send();
            });

        })
        .catch((err) => {
            res.status(400).send('');
        });
    
}