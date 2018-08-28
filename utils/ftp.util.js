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

    ftp.connect({
        host: process.env.FTP_HOST,
        port: process.env.FTP_PORT,
        username: process.env.FTP_username,
        password: process.env.FTP_password,
        type : 'ftp'
    });
    res.send("ok");

}

exports.listFiles = (res) => {

    ftp.pwd((err, path) => {
        ftp.ls(path, (err, list) => {
            res.send(list);
        })
    })
}
