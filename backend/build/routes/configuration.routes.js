"use strict";
var express = require("express");
var router = express.Router();
var controller = require("../controllers/configuration.controller");
router.get("/", controller.get);
router.put("/", controller.update);
module.exports = router;
