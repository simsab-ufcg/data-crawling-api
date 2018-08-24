/**
 * Ftp connector
 * 
 * @author Filipe Mendonca
 */

// https://github.com/humy2833/easy-ftp#readme
var EasyFtp = require('easy-ftp');
var ftp = new EasyFtp();

/**
 * 
 * @param {Object should have  this attributes: host, type, port, username and password } config 
 */
exports.connectFtp = (config, res, next) => {

    ftp.connect(config);
    res.send("ok");

}

exports.listFiles = (res) => {

    ftp.pwd((err, path) => {
        ftp.ls(path, (err, list) => {
            res.send(list);
        })
    })
}
