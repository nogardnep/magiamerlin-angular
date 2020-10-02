"use strict";
var config = require('./config.controller.js');
exports.get = function (req, res, next) {
    res.status(200).json(config.getUserConfiguration());
};
exports.update = function (req, res, next) {
    config.setUserConfiguration(req.body);
    res.status(200).json({});
};
