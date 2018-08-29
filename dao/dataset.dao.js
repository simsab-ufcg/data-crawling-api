/**
 * @author Gabriel Felipe, Ana Silva
 */

const dbConfig = require('../config/db.config');

exports.listDataSets = (next) => {

    const client = dbConfig.connect();

    client.query(`SELECT ds.name, ds.created_date, 
        ds.updated_date, ds.description, SUM(d.size) as size 
        FROM dataset as ds JOIN data as d ON d.dataset_id = ds.id
        GROUP BY ds.id;`, (err, res) => {

            if(err)
                throw err;
            
            const ret = res.rows;
            
            dbConfig.disconnect(client);

            next(ret);
        });
}

exports.postDataSet = (dataSet, next) => {
    const client = dbConfig.connect();

    client.query(`INSERT INTO dataset (name, created_date, updated_date, description) VALUES ($1, $2, $3, $4);`, 
        [dataSet.name, dataSet.created_date, dataSet.updated_date, dataSet.description], (err, res) => {
        client.query('SELECT id, name FROM dataset WHERE name = $1;', [dataSet.name], (err, res) => {
            if(err)
                throw err;
            next(res.rows[0].id);
        });
    });
};