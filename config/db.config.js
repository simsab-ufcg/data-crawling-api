/**
 * @author Felipe Mota
 */
exports.connect = () => {
    var pg = require("pg");

    var connectionURL = process.env.connectionURL || 'postgresql://postgres:simsab@localhost:5432/simsab_dataset';

    var client = new pg.Client(connectionURL);

    client.connect();

    return client;
};

exports.disconnect = (client) => {
    client.end();
};