"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.getAll = function (model, req, res, next, foreignKeys) {
    if (foreignKeys === void 0) { foreignKeys = []; }
    console.log("Getting all entities");
    model.find()
        .populate(foreignKeys)
        .then(function (entities) {
        res.status(200).json(entities);
    }).catch(function (error) {
        res.status(400).json({
            error: error
        });
    });
};
exports.getOne = function (model, req, res, next, foreignKeys) {
    if (foreignKeys === void 0) { foreignKeys = []; }
    console.log("Getting one entity");
    model.findOne({
        _id: req.params.id
    })
        .populate(foreignKeys)
        .then(function (entity) {
        if (entity !== null) {
            res.status(200).json(entity);
        }
        else {
            res.status(404).json();
        }
    })
        .catch(function (error) {
        res.status(404).json({
            error: error
        });
    });
};
exports.createOne = function (model, req, res, next) {
    console.log("Creating one entity");
    if (req.body.id != undefined) {
        delete req.body.id;
    }
    var newEntity = new model(__assign({}, req.body));
    newEntity.save()
        .then(function () {
        res.status(201).json({
            message: "Post saved successfully",
            data: newEntity
        });
    })
        .catch(function (error) {
        res.status(400).json({
            error: error
        });
    });
};
exports.updateAll = function (model, req, res, next) {
    console.log("Modifying all entities (TODO)");
    // TODO
};
exports.updateOne = function (model, req, res, next) {
    console.log("Modifying one entity");
    model.updateOne({ _id: req.params.id }, __assign(__assign({}, req.body), { _id: req.params.id }))
        .then(function () {
        res.status(200).json({
            message: 'entity modified'
        });
    })
        .catch(function (error) { res.status(400).json({ error: error }); });
};
exports.deleteOne = function (model, req, res, next) {
    console.log("Deleting one entity");
    model.deleteOne({ _id: req.params.id })
        .then(function () { return res.status(200).json({ message: 'entity deleted' }); })
        .catch(function (error) { return res.status(400).json({ error: error }); });
};
