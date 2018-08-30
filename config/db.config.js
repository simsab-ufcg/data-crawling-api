/**
 * @author Felipe Mota
 */
exports.connect = () => {
    const pg = require("pg");

    const connectionURL = process.env.connectionURL || 'postgresql://postgres:simsab@localhost:5432/simsab_dataset';

    const client = new pg.Client(connectionURL);

    client.connect();

    return client;
};

exports.disconnect = (client) => {
    client.end();
};