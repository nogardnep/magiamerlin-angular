"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require('fs');
var del = require('del');
var glob = require('glob');
var pathController = require("./path.controller");
var dataFilename = 'data.json';
exports.getAll = function (req, res, next) {
    var projects = [];
    console.log(pathController.getProjectsPath());
    glob(pathController.getProjectsPath() + '/*/' + dataFilename, function (error, items) {
        if (error) {
            res.status(400).json(error);
            console.log('Error', error);
        }
        else {
            items.forEach(function (item) {
                projects.push(JSON.parse(fs.readFileSync(item)));
            });
            res.status(200).json(projects);
        }
    });
};
exports.getOne = function (req, res, next) {
    glob(pathController.getProjectsPath() + '/' + req.params.name + '/' + dataFilename, function (err, items) {
        if (err) {
            console.log('Error', err);
        }
        else {
            var project = null;
            if (items.length > 0) {
                project = JSON.parse(fs.readFileSync(items[0]));
            }
            res.status(200).json(project);
        }
    });
};
exports.createOne = function (req, res, next) {
    var newProject = req.body;
    fs.access(pathController.getOneProjectPath(newProject.name), function (error) {
        if (!error) {
            var message = 'Project "' + newProject.name + '" already exists';
            res.status(400).json(message);
        }
        else {
            fs.mkdirSync(getOneProjectPath(newProject.name));
            storeProject(newProject);
            res.status(201).json(newProject);
        }
    });
};
exports.updateOne = function (req, res, next) {
    var projectName = req.body.name;
    var project = req.body;
    fs.access(pathController.getOneProjectPath(projectName), function (error) {
        if (error) {
            var message = "project " + projectName + " doesn't exist";
            res.status(400).json({
                error: message,
            });
        }
        else {
            storeProject(project);
            res.status(201).json(project);
        }
    });
};
exports.deleteOne = function (req, res, next) {
    var projectName = req.params.name;
    var dir = pathController.getOneProjectPath(projectName);
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, del(dir, { force: true })];
                case 1:
                    _a.sent();
                    res.status(200).json({ message: 'entity deleted' });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    (function (error) { return res.status(400).json({ error: error }); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })();
};
function storeProject(project) {
    fs.writeFileSync(pathController.getOneProjectDataPath(project.name), JSON.stringify(project, null, 2));
}
