import { SelectionService } from 'src/app/services/control/selection.service';
import { ResourceType, Resource } from 'src/app/models/entity/Resource.model';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResourcesDataService {
  constructor(
    private httpClient: HttpClient,
    private serverService: ServerService,
    private selectionService: SelectionService
  ) {}

  loadResources(
    type?: ResourceType,
    local: boolean = false
  ): Promise<object[]> {
    let url = this.serverService.getRootForResources();

    if (local) {
      url += '/local/' + this.selectionService.getSelectedProject().name;
    } else {
      url += '/global';
    }

    url += '/files';

    if (type !== undefined) {
      url += '/' + type;
    }

    return new Promise((resolve, reject) => {
      this.httpClient.get<Resource[]>(url).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.serverService.printError(
            'error when loading projects: ' + error
          );
          reject(error);
        }
      );
    });
  }

  getSrc(resource: Resource): string {
    let url = this.serverService.getRootForResources();

    if (resource.local !== undefined && resource.local) {
      url += '/local/' + this.selectionService.getSelectedProject().name;
    } else {
      url += '/global';
    }

    url += '/src/' + resource.path;

    return url;
  }
}
