import { NextFunction, Request, Response } from 'express';

interface TrackPreset {
  name: string;
}

export class TrackPresetController {
  static getAll(req: Request, res: Response, next: NextFunction): void {
    // const dir = PathManager.getTrackPresetsPath();
    // fs.ensureDir(dir)
    //   .then(() => {
    //     const presets: TrackPreset[] = [];
    //     fs.readdir(dir).then((items: string[]) => {
    //       items.forEach((item: string) => {
    //         const path = PathManager.getTrackPresetDataFilePath(item);
    //         if (fs.existsSync(path)) {
    //           const data = await fs.readJson('./package.json');
    //           presets.push(JSON.parse(fs.readFileSync(path)));
    //         } else {
    //           const message = "Unfound data for preset " + item;
    //           LogManager.log(LogType.Error, message);
    //           res.status(400).json({
    //             message,
    //           });
    //         }
    //       });
    //       console.log(presets);
    //       res.status(201).json(presets);
    //     });
    //   })
    //   .catch((error: string) => {
    //     LogManager.log(LogType.Error, error);
    //     res.status(400).json({
    //       message: error,
    //     });
    //   });
  }

  static getOne(req: Request, res: Response, next: NextFunction): void {
    // TODO
  }

  static createOne(req: Request, res: Response, next: NextFunction): void {
    // const preset = req.body;
    // fs.access(PathManager.getTrackPresetFolderPath(preset.name), (error: any) => {
    //   if (!error) {
    //     const message = "preset " + preset.name + " already exists";
    //     console.error(message);
    //     res.status(400).json({
    //       error: message,
    //     });
    //   } else {
    //     fs.mkdirSync(PathManager.getTrackPresetFolderPath(preset.name));
    //     TrackPresetController.storePreset(preset);
    //     res.status(201).json(preset);
    //   }
    // });
  }

  static updateOne(req: Request, res: Response, next: NextFunction): void {
    // const preset = req.body;
    // fs.access(PathManager.getTrackPresetFolderPath(preset.name), (error: any) => {
    //   if (error) {
    //     const message = "preset " + preset.name + " doesn't exist";
    //     console.error(message);
    //     res.status(400).json({
    //       error: message,
    //     });
    //   } else {
    //     TrackPresetController.storePreset(preset);
    //     res.status(201).json(preset);
    //   }
    // });
  }

  static deleteOne(req: Request, res: Response, next: NextFunction): void {
    // const name = req.params.name;
    // const dir = PathManager.getTrackPresetFolderPath(name);
    // (async () => {
    //   try {
    //     await del(dir);
    //     res.status(200).json({ message: "entity deleted" });
    //   } catch (error) {
    //     (error: any) => res.status(400).json({ error });
    //   }
    // })();
  }

  private static storePreset(preset: TrackPreset) {
    // fs.writeFileSync(
    //   PathManager.getTrackPresetDataFilePath(preset.name),
    //   JSON.stringify(preset, null, 2)
    // );
  }
}
