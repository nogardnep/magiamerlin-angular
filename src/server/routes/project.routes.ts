import * as express from 'express';
import { ProjectController } from '../controllers/project.controller';
const router = express.Router();

router.get('/', ProjectController.getAll);
router.get('/:name', ProjectController.getOne);
router.post('/', ProjectController.createOne);
router.put('/:name', ProjectController.updateOne);
router.delete('/:name', ProjectController.deleteOne);

module.exports = router;
