"use strict";
var express = require("express");
var router = express.Router();
var controller = require("../controllers/resource.controller");
router.get("/", function () {
    console.log('fqfdf');
});
// router.get("global/files/:type", controller.getAllGlobal);
// router.get("global/file/*", controller.getOneGlobal); 
// router.get("local/:projectName/files/:type", controller.getAllLocal);
// router.get("local/:projectName/file/*", controller.getOneLocal); 
module.exports = router;
