import { Component, Input } from '@angular/core';
import { Resource, ResourceType } from 'src/models/entity/Resource.model';
import { Track } from 'src/models/entity/Track.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-track-video-loader',
  templateUrl: './track-video-loader.component.html',
  styleUrls: ['./track-video-loader.component.scss'],
})
export class TrackVideoLoaderComponent {
  @Input() track: Track;
  type = ResourceType.Video;

  constructor(private selectionService: SelectionService) {}

  onLoaded(resource: Resource): void {
    this.selectionService.setTrackVideo(this.track, resource);
  }
}
