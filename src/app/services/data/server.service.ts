import { config } from './../../../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private root = config.url + ':' + config.backendPort + '/' + config.apiRoot;

  constructor() {}

  getRootForProjects(): string {
    return this.root + '/' + config.routes.project;
  }

  getRootForTracksPresets(): string {
    return this.root + '/' + config.routes.project;
  }

  getRootForUploads(): string {
    return this.root + '/' + config.routes.upload;
  }

  getRootForResources(): string {
    return this.root + '/' + config.routes.resource;
  }

  getRootForConfiguration(): string {
    return this.root + '/' + config.routes.configuration;
  }

  printError(message: string): void {
    console.error(message);
  }
}
