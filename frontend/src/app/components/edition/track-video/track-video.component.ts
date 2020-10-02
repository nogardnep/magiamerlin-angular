import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'src/app/models/entity/Track.model';
import { ResourcesDataService } from 'src/app/services/data/resources-data.service';

@Component({
  selector: 'app-track-video',
  templateUrl: './track-video.component.html',
  styleUrls: ['./track-video.component.scss'],
})
export class TrackVideoComponent {
  @Input() track: Track;

  constructor(
    private router: Router,
    private resourcesService: ResourcesDataService
  ) {}

  onClickLoadVideo(): void {
    this.router.navigate(['/track-video-loader']); // TODO: do not use string
  }

  onClickEmptyVideo(): void {
    this.track.video.resource = null;
  }

  getVideoSrc(): string {
    return this.resourcesService.getSrc(this.track.video.resource);
  }
}
