/**
 * @author Gabriel Felipe, Ana Silva
 */

var pg = require("pg");

var connectionURL = process.env.connectionURL || 'postgresql://postgres:simsab@localhost:5432/simsab_dataset';

var client = new pg.Client(connectionURL);

client.connect();

client.query("CREATE TABLE IF NOT EXISTS data(id SERIAL PRIMARY KEY, dataset_id INTEGER REFERENCES dataset(id),name VARCHAR(50) NOT NULL UNIQUE, created_date TIMESTAMP, updated_date TIMESTAMP NOT NULL, description TEXT, download_link TEXT NOT NULL, size INTEGER);", (err, res) =>{
    client.end();
});