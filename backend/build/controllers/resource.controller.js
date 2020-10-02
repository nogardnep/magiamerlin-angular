"use strict";
var glob = require('glob');
var callbackify = require('util').callbackify;
var pathController = require("./path.controller");
var types = {
    visual: ['jpg', 'png'],
    sound: ['wav', 'mp3']
};
exports.getAllGlobal = function (req, res, next) {
    getAll(pathController.getGlobalResourcePath(), req, res, next);
};
exports.getAllLocal = function (req, res, next) {
    var projectName = req.params.projectName;
    getAll(pathController.getLocalResourcePath(projectName), req, res, next);
};
exports.getOneGlobal = function (req, res, next) {
    getOne(pathController.getGlobalResourcePath());
};
exports.getOneLocal = function (req, res, next) {
    getOne(pathController.getLocalResourcePath());
};
function getAll(resourcePath, req, res, next) {
    var type = req.params.type;
    glob(makePattern(resourcePath, types[type]), function (err, items) {
        if (err) {
            console.log('Error', err);
            res.status(400).json(err);
        }
        else {
            var resources_1 = [];
            items.forEach(function (item) {
                resources_1.push(item.replace(resourcePath + "/", ""));
            });
            res.status(201).json(resources_1);
        }
    });
}
function getOne(resourcePath, req, res, next) {
    var filepath = resourcePath + '/' + req.params[0];
    res.sendFile(filepath);
}
function makePattern(src, extensions) {
    var pattern = src + "/**/";
    if (extensions === null || extensions === undefined) {
        pattern += '*.*';
    }
    else {
        pattern += '?(';
        extensions.forEach(function (extension, index) {
            pattern += '*.' + extension;
            if (index + 1 < extensions.length) {
                pattern += '|';
            }
            else {
                pattern += ')';
            }
        });
    }
    return pattern;
}
