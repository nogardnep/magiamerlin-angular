import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Resource, ResourceType } from 'src/models/entity/Resource.model';
import { ResourcesDataService } from 'src/app/services/data/resources-data.service';

@Component({
  selector: 'app-resource-loader',
  templateUrl: './resource-loader.component.html',
  styleUrls: ['./resource-loader.component.scss'],
})
export class ResourceLoaderComponent implements OnChanges {
  @Input() type: ResourceType;
  @Input() target: Resource;
  @Output() loaded = new EventEmitter<Resource>();
  @Output() focused = new EventEmitter<Resource>();
  focusedResource: Resource = null;
  resources: Resource[] = [];
  local = false;
  loading = true;

  constructor(
    private router: Router,
    private location: Location,
    private resourcesService: ResourcesDataService
  ) {}

  ngOnChanges(): void {
    if (this.target !== null && this.target.local !== undefined) {
      this.local = this.target.local;
    }

    this.loadResources();
  }

  onClickResource(resource: Resource): void {
    this.focusedResource = resource;
    this.focused.emit(this.focusedResource);
  }

  onClickLoad(): void {
    if (this.focusedResource !== null) {
      this.loaded.emit(this.focusedResource);
      this.location.back();
    }
  }

  onClickCancel(): void {
    this.location.back();
  }

  onChangeLocal(): void {
    this.focusedResource = null;
    this.loadResources();
  }

  isFocused(resource: Resource): boolean {
    if (this.focusedResource !== null) {
      return resource.path === this.focusedResource.path;
    }
  }

  private loadResources(): void {
    this.loading = true;

    this.resourcesService
      .loadResources(this.type, this.local)
      .then((resources: Resource[]) => {
        this.resources = resources;
        this.loading = false;
      });
  }
}
