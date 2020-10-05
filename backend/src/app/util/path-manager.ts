import { ConfigMangager } from "./config-manager";
import { apiConfig } from "../config/api.config";

export class PathManager {
  static projectDataFileName = "project.json";
  static presetDataFileName = "preset.json";

  static getGlobalResourcePath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      "/" +
      apiConfig.resourcesPath
    );
  }

  static getLocalResourcePath(projectName: string): string {
    return this.getOneProjectPath(projectName);
  }

  static getProjectsPath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      "/" +
      apiConfig.projectsPath
    );
  }

  static getOneProjectPath(projectName: string): string {
    return PathManager.getProjectsPath() + "/" + projectName;
  }

  static getOneProjectDataPath(projectName: string): string {
    return (
      PathManager.getOneProjectPath(projectName) +
      "/" +
      PathManager.projectDataFileName
    );
  }

  static getTrackPresetsPath() {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      "/" +
      apiConfig.trackPresetsPath
    );
  }

  static getTrackPresetDataFilePath(presetName: string) {
    return (
      PathManager.getTrackPresetFolderPath(presetName) +
      "/" +
      PathManager.presetDataFileName
    );
  }

  static getTrackPresetFolderPath(presetName: string) {
    return PathManager.getTrackPresetsPath() + "/" + presetName;
  }
}
