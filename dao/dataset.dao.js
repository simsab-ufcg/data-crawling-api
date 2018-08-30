/**
 * @author Gabriel Felipe, Ana Silva
 */

const dbConfig = require('../config/db.config');

exports.listDataSets = () => {

    return new Promise((resolve, reject) => {
        const client = dbConfig.connect();

        client.query(`SELECT ds.name, ds.created_at, 
            ds.updated_at, ds.description, SUM(d.size) as size 
            FROM dataset as ds JOIN data as d ON d.dataset_id = ds.id
            GROUP BY ds.id;`, (err, res) => {

                if(err)
                    reject(err);
                
                const ret = res.rows;
                
                dbConfig.disconnect(client);

                resolve(ret);
            });
    });
}

exports.postDataSet = (dataSet) => {

    return new Promise((resolve, reject) => {
        const client = dbConfig.connect();

        client.query(`INSERT INTO dataset (name, created_at, updated_at, description) VALUES ($1, $2, $3, $4);`, 
            [dataSet.name, dataSet.created_at, dataSet.updated_at, dataSet.description], (err, res) => {

            if(err)
                reject(err);
            
            client.query('SELECT id, name FROM dataset WHERE name = $1;', [dataSet.name], (err, res) => {
                
                if(err)
                    reject(err);

                dbConfig.disconnect(client);
                resolve(res.rows[0].id);
            });
        });
    });
};