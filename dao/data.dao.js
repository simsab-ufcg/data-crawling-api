/**
 * @author Gabriel Felipe, Ana Silva
 */


exports.listData = (datasetName) => {

    var pg = require("pg");

    var connectionURL = process.env.connectionURL || 'postgresql://postgres:simsab@localhost:5432/simsab_dataset';

    var client = new pg.Client(connectionURL);

    client.connect();

    client.query(`SELECT d.name, d.created_date, 
        d.updated_date, d.description, d.size, d.download_link 
        FROM data as d JOIN dataset as ds ON d.dataset_id = ds.id
        WHERE ds.name = $1;`, [datasetName], (err, res) => {
            var ret = res.rows;
            client.end;
            return ret;
        });
}