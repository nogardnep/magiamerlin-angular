import { Component, Input } from '@angular/core';
import { Resource, ResourceType } from 'src/app/models/entity/Resource.model';
import { Track } from 'src/app/models/entity/Track.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-track-audio-loader',
  templateUrl: './track-audio-loader.component.html',
  styleUrls: ['./track-audio-loader.component.scss'],
})
export class AudioTrackLoaderComponent {
  @Input() track: Track;
  type = ResourceType.Audio;

  constructor(private selectionService: SelectionService) {}

  onLoaded(resource: Resource): void {
    this.selectionService.setTrackSound(this.track, resource);
  }
}
