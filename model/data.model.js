/**
 * @author Gabriel Felipe, Ana Silva
 */

const dbConfig = require('../config/db.config');

const client = dbConfig.connect();

client.query("CREATE TABLE IF NOT EXISTS data(id SERIAL PRIMARY KEY, dataset_id INTEGER REFERENCES dataset(id),name VARCHAR(50) NOT NULL, created_at TIMESTAMP, updated_at TIMESTAMP NOT NULL, description TEXT, download_link TEXT NOT NULL, size INTEGER);", (err, res) =>{
    dbConfig.disconnect(client);
});