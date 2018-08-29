/**
 * @author Gabriel Felipe, Ana Silva
 */

 const dbConfig = require('../config/db.config');

exports.getData = (datasetName, next) => {

    const client = dbConfig.connect();
    
    client.query(`SELECT d.name, d.created_date, 
        d.updated_date, d.description, d.size, d.download_link 
        FROM data as d JOIN dataset as ds ON d.dataset_id = ds.id
        WHERE ds.name = $1;`, [datasetName], (err, res) => {
            var ret = res.rows;
            
            dbConfig.disconnect(client);

            next(ret);
        });
};

exports.postData = (dataSetId, data) => {

    const client = dbConfig.connect();

    client.query(`INSERT INTO data (dataset_id, name, created_date, updated_date, description, download_link, size) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [dataSetId, data.name, data.created_date, data.updated_date, data.description, data.download_link, data.size], 
        (err, res) => {
            
            if(err)
                throw err;
            
            console.log(res);
        }
    );
    
};