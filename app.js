var express = require("express");
var router = express.Router();
var api = require('./routes/api.routes');

var app = express();

app.use('/api', api);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});