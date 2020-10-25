import { config } from '../../config/config';
import { ConfigMangager } from './config-manager';

export class PathManager {
  static projectDataFileName = 'project.json';
  static presetDataFileName = 'preset.json';

  static getGlobalResourcePath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      '/' +
      config.resourcesPath
    );
  }

  static getLocalResourcePath(projectName: string): string {
    return this.getOneProjectPath(projectName);
  }

  static getProjectsPath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      '/' +
      config.projectsPath
    );
  }

  static getOneProjectPath(projectName: string): string {
    return PathManager.getProjectsPath() + '/' + projectName;
  }

  static getOneProjectDataPath(projectName: string): string {
    return (
      PathManager.getOneProjectPath(projectName) +
      '/' +
      PathManager.projectDataFileName
    );
  }

  static getTrackPresetsPath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      '/' +
      config.trackPresetsPath
    );
  }

  static getTrackPresetDataFilePath(presetName: string): string {
    return (
      PathManager.getTrackPresetFolderPath(presetName) +
      '/' +
      PathManager.presetDataFileName
    );
  }

  static getTrackPresetFolderPath(presetName: string): string {
    return PathManager.getTrackPresetsPath() + '/' + presetName;
  }
}
