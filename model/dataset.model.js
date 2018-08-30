/**
 * @author Gabriel Felipe, Ana Silva
 */

const dbConfig = require('../config/db.config.js');

const client = dbConfig.connect();

client.query("CREATE TABLE IF NOT EXISTS dataset(id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL UNIQUE, created_at TIMESTAMP, updated_at TIMESTAMP NOT NULL, description TEXT);", (err, res) =>{
    const dataModel = require('./data.model');
    dbConfig.disconnect(client);
});



