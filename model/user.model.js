/**
 * @author Ana Silva
 */

 var pg = require("pg");

 var connectionURL = process.env.connectionURL || 'postgres://localhost:5432/simsab-dataset';

var client = new pg.Client(connectionURL);

client.connect();

var query = client.query("CREATE TABLE user(id SERIAL PRIMARY KEY, username VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(30) NOT NULL)");
query.on('end', () => {client.end});