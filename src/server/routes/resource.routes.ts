// import { ResourceController } from './../controllers/resource.controller';
// import * as express from "express";
// const router = express.Router();

// router.get("global/", ()=> {
//     console.log('test')
// });
// router.get("global/files/:type", ResourceController.getAllGlobal);
// router.get("global/file/*", ResourceController.getOneGlobal);
// router.get("local/:projectName/files/:type", ResourceController.getAllLocal);
// router.get("local/:projectName/file/*", ResourceController.getOneLocal);

// module.exports = router;

import * as express from 'express';
import { ResourceController } from '../controllers/resource.controller';
const router = express.Router();

router.get('/global/files/', ResourceController.getAllGlobal);
router.get('/global/files/:types', ResourceController.getAllGlobal);
router.get('/global/src/*', ResourceController.getOneGlobal);
router.get('/local/:projectName/files/', ResourceController.getAllLocal);
router.get('/local/:projectName/files/:types', ResourceController.getAllLocal);
router.get('/local/:projectName/src/*', ResourceController.getOneLocal);

module.exports = router;
