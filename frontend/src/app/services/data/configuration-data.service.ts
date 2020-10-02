import { ServerService } from './server.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Configuration = {
  dataRoot: string;
};

@Injectable({
  providedIn: 'root',
})
export class ConfigurationDataService {
  constructor(
    private httpClient: HttpClient,
    private serverService: ServerService
  ) {}

  load(): Promise<Configuration> {
    return new Promise((resolve, reject) => {
      this.httpClient.get<Configuration>(this.getConfigurationPath()).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.serverService.printError(
            'error when loading configuration: ' + error
          );
          reject(error);
        }
      );
    });
  }

  update(configuration: Configuration): Promise<Configuration> {
    return new Promise<Configuration>((resolve, reject) => {
      this.httpClient.put(this.getConfigurationPath(), configuration).subscribe(
        () => {
          resolve();
        },
        (error) => {
          this.serverService.printError(
            'error when updating configuration: ' + error
          );
          reject(error);
        }
      );
    });
  }

  private getConfigurationPath(): string {
    return this.serverService.getRootForConfiguration();
  }
}
