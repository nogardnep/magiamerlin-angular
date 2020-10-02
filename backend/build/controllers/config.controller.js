"use strict";
var fs = require('fs');
var userConfigurationPath = 'src/config/user-config.json';
exports.getUserConfiguration = function () {
    return JSON.parse(fs.readFileSync(userConfigurationPath));
};
exports.setUserConfiguration = function (userConfiguation) {
    console.log(userConfiguation);
    fs.writeFileSync(userConfigurationPath, JSON.stringify(userConfiguation, null, 2));
};
