import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private apiRoot = 'http://localhost:8000/api';

  constructor() {}

  getRootForProjects(): string {
    return this.apiRoot + '/project';
  }

  getRootForTracksPresets(): string {
    return this.apiRoot + '/tracks-preset';
  }

  getRootForUploads(): string {
    return this.apiRoot + '/upload';
  }

  getRootForResources(): string {
    return this.apiRoot + '/resource';
  }

  getRootForConfiguration(): string {
    return this.apiRoot + '/configuration';
  }

  printError(message: string): void {
    console.error(message);
  }
}
