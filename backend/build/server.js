"use strict";
var apiConfig = require('./src/config/api.config');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
console.log('test');
var app = express();
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.get('/test', function (req, res) {
    var filepath = path.join('data/resources/images/gargouille-amboise.jpg');
    res.sendFile(filepath, { root: __dirname });
});
app.use(function (req, res, next) {
    // TODO: choose
    //res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
var projectRoutes = require("./routes/project.routes");
var resourceRoutes = require("./routes/resource.routes");
var tracksPresetRoutes = require("./routes/track-preset.routes");
var configurationRoutes = require("./routes/configuration.routes");
app.use(apiConfig.apiRoot + '/project', projectRoutes);
app.use(apiConfig.apiRoot + '/resource', resourceRoutes);
app.use(apiConfig.apiRoot + '/tracks-preset', tracksPresetRoutes);
app.use(apiConfig.apiRoot + '/configuration', configurationRoutes);
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode)
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
app.listen(apiConfig.port, function () {
    console.log("app listening on port " + apiConfig.port);
});
module.exports = app;