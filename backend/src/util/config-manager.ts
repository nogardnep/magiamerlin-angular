import * as fs from "fs";

export type UserConfiguration = {
  dataRoot: string;
};

export class ConfigMangager {
  static userConfigPath = "src/config/user-config.json";
  static userConfiguration: UserConfiguration;

  static getUserConfiguration(): UserConfiguration {
    if (this.userConfiguration === undefined) {
      this.userConfiguration = JSON.parse(
        fs.readFileSync(ConfigMangager.userConfigPath).toString()
      ) as UserConfiguration;
    }

    return this.userConfiguration;
  }

  static setUserConfig(userConfiguation: UserConfiguration): void {
    this.userConfiguration = userConfiguation;

    fs.writeFileSync(
      ConfigMangager.userConfigPath,
      JSON.stringify(userConfiguation, null, 2)
    );
  }
}
