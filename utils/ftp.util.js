/**
 * Ftp connector
 * 
 * @author Filipe Mendonca
 */

var Client = require('ftp');
var c = new Client();

exports.connectFtp = (config, res, next) => {

  c.end();
  c = new Client();

  c.on('ready', function() {
    res.status(201).send('FTP connection successfully established');
    return next();
  });

  c.on('error', function() {
    res.status(400).send('Could not establish FTP connection');
    return next();
  });

  c.connect(config);

}

exports.getClient = () => {
    return c;
}