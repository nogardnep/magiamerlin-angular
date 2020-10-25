import { TrackPresetController } from './../controllers/track-preset.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', TrackPresetController.getAll);
router.get('/:name', TrackPresetController.getOne);
router.post('/', TrackPresetController.createOne);
router.put('/:name', TrackPresetController.updateOne);
router.delete('/:name', TrackPresetController.deleteOne);

module.exports = router;
