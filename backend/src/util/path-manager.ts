import { ConfigMangager } from "./config-manager";
import { apiConfig } from "../config/api.config";

export class PathManager {
  static projectDataFileName = "data.json";
  static presetDataFileName = "data.json";

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

  static getPresetDataFilePath(presetName: string) {
    return (
      PathManager.getPresetFolderPath(presetName) +
      "/" +
      PathManager.presetDataFileName
    );
  }

  static getPresetFolderPath(presetName: string) {
    return apiConfig.presetsPath + "/" + presetName;
  }
}
