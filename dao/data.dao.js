/**
 * @author Gabriel Felipe, Ana Silva
 */

 const dbConfig = require('../config/db.config');

exports.getData = (datasetName) => {

    return new Promise((resolve, reject) => {
        const client = dbConfig.connect();
    
        client.query(`SELECT d.name, d.created_at, 
            d.updated_at, d.description, d.size, d.download_link 
            FROM data as d JOIN dataset as ds ON d.dataset_id = ds.id
            WHERE ds.name = $1;`, [datasetName], (err, res) => {

                if(err)
                    reject(err);

                const ret = res.rows;
                
                dbConfig.disconnect(client);

                resolve(ret);
            });
    });
};

exports.postData = (dataSetId, data) => {

    return new Promise((resolve, reject) => {
        const client = dbConfig.connect();

        client.query(`INSERT INTO data (dataset_id, name, created_at, updated_at, description, download_link, size) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [dataSetId, data.name, data.created_at, data.updated_at, data.description, data.download_link, data.size], 
            (err, res) => {
                
                if(err)
                    reject(err);

                dbConfig.disconnect(client);
                
                resolve(res);
            }
        );
    });
    
};