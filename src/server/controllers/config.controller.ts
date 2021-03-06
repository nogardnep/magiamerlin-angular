import { Request, Response } from 'express';
import { UserConfiguration, ConfigMangager } from '../util/config-manager';

export class ConfigController {
  static get(req: Request, res: Response): void {
    res.status(200).json(ConfigMangager.getUserConfiguration());
  }

  static update(req: Request, res: Response): void {
    const newUserConfiguration: UserConfiguration = req.body;

    ConfigMangager.setUserConfig(newUserConfiguration);

    res.status(200).json(ConfigMangager.getUserConfiguration());
  }
}
