/**
 * @author Ana Silva
 */

/**
 * @var express
 *      node framework to make my life easier
 * @var morgan
 *      Logger middleware.
 * @var bodyParser
 *      Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 * @var port
 *      Sets the port to be used by the application
 */
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
require('./config/auth.config');

/**
 * Loads all the api specific routes
 */
var api = require('./routes/api.routes');

var app = express();

/**
 * Parsing body
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * log stuff
 */
app.use(morgan('dev'));

/**
 * bind specific routes into the main file
 */
app.use('/api', api);

/**
 * index route
 */
app.get('/', (req, res) => {
    res.send("Application works");
});

/**
 * application listening on the port
 */
app.listen(port, () => {
    console.log("Server running on port 3000");
});