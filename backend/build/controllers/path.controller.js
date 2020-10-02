"use strict";
var apiConfig = require('../config/api.config');
var configController = require('./config.controller');
exports.getGlobalResourcePath = function () {
    return userConfig.dataRoot + '/' + apiConfig.resourcesPath;
};
exports.getLocalResourcePath = function (projectName) {
    return userConfig.dataRoot + '/' + apiConfig.resourcesPath;
};
exports.getProjectsPath = function () {
    return configController.getUserConfiguration().dataRoot + '/' + apiConfig.projectsPath;
};
exports.getOneProjectPath = function (projectName) {
    return getProjectsPath() + '/' + projectName;
};
exports.getOneProjectDataPath = function (projectName) {
    return getOneProjectPath(projectName) + '/' + dataFilename;
};
