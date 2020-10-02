import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import { PathManager } from "../util/path-manager";
const fs = require("fs");
const del = require("del");
const apiConfig = require("../config/api.config");

interface TrackPreset {
  name: string;
}

export class TrackPresetController {
  static getAll(req: Request, res: Response, next: NextFunction): void {
    fs.readdir(apiConfig.presetsPath, (error: any, items: string[]) => {
      if (error) {
        res.status(400).json({
          error,
        });
      } else {
        const presets: TrackPreset[] = [];

        items.forEach((item: string) => {
          if (fs.existsSync(PathManager.getPresetDataFilePath(item))) {
            presets.push(
              JSON.parse(
                fs.readFileSync(PathManager.getPresetDataFilePath(item))
              )
            );
          } else {
            console.error("Unfound data for preset " + item);
          }
        });

        console.log(presets);

        res.status(201).json(presets);
      }
    });
  }

  static getOne(req: Request, res: Response, next: NextFunction): void {
    // TODO
  }

  static createOne(req: Request, res: Response, next: NextFunction): void {
    const preset = req.body;

    fs.access(PathManager.getPresetFolderPath(preset.name), (error: any) => {
      if (!error) {
        const message = "preset " + preset.name + " already exists";
        console.error(message);
        res.status(400).json({
          error: message,
        });
      } else {
        fs.mkdirSync(PathManager.getPresetFolderPath(preset.name));
        TrackPresetController.storePreset(preset);
        res.status(201).json(preset);
      }
    });
  }

  static updateOne(req: Request, res: Response, next: NextFunction): void {
    const preset = req.body;

    fs.access(PathManager.getPresetFolderPath(preset.name), (error: any) => {
      if (error) {
        const message = "preset " + preset.name + " doesn't exist";
        console.error(message);
        res.status(400).json({
          error: message,
        });
      } else {
        TrackPresetController.storePreset(preset);
        res.status(201).json(preset);
      }
    });
  }

  static deleteOne(req: Request, res: Response, next: NextFunction): void {
    const name = req.params.name;

    const dir = PathManager.getPresetFolderPath(name);

    (async () => {
      try {
        await del(dir);

        res.status(200).json({ message: "entity deleted" });
      } catch (error) {
        (error: any) => res.status(400).json({ error });
      }
    })();
  }

  private static storePreset(preset: TrackPreset) {
    fs.writeFileSync(
      PathManager.getPresetDataFilePath(preset.name),
      JSON.stringify(preset, null, 2)
    );
  }
}
