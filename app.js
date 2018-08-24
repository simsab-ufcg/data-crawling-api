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
 * @requires dotenv
 *      Load enviroment file
 */
require('dotenv').load();
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var port = process.env.PORT || 6000;
var request = require("request");
var session = require("express-session");
var passport = require("passport");
var path = require("path");
var flash = require("connect-flash");
require('./config/auth.config');

/**
 * Loads all the api specific routes
 */
var api = require('./routes/api.routes');
var auth = require('./routes/auth.routes');
/**
 * Loads other dependencies.
 */
app.use(require('cookie-parser')());
const expressSession = require("express-session");
app.use(expressSession({secret: process.env.SECRET_KEY}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({secret: process.env.ANOTHER_SECRET_KEY}));
app.set('view engine', 'pug');
app.set('view options', { layout: false });

var app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
  }

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

app.use('/auth', auth);

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
    console.log("Server running on port " +port);
});