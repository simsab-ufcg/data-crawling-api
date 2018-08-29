/**
 * @author Gabriel Felipe, Ana Silva
 */

var pg = require("pg");

var connectionURL = process.env.connectionURL || 'postgresql://postgres:simsab@localhost:5432/simsab_dataset';

var client = new pg.Client(connectionURL);

client.connect();

client.query("CREATE TABLE IF NOT EXISTS dataset(id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL UNIQUE, created_date TIMESTAMP, updated_date TIMESTAMP NOT NULL, description TEXT);", (err, res) =>{
    client.end();
});



