import { OutputService } from 'src/app/services/io/output.service';
import { ParametersModel } from 'src/models/Parameter';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'src/models/entity/Track.model';
import { trackAudioParametersModel } from 'src/models/entity/TrackAudio.model';
import { ResourcesDataService } from 'src/app/services/data/resources-data.service';
import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';

@Component({
  selector: 'app-track-audio',
  templateUrl: './track-audio.component.html',
  styleUrls: ['./track-audio.component.scss'],
})
export class TrackAudioComponent {
  @Input() track: Track;

  constructor(
    private router: Router,
    private samplerService: AudioSamplerService,
    private resourcesService: ResourcesDataService
  ) {}

  onClickLoadSound(): void {
    this.router.navigate(['/track-audio-loader']); // TODO: do not use string
  }

  onClickEmptySound(): void {
    this.track.audio.resource = null;
    this.samplerService.updateTrack(this.track);
  }

  getAudioSrc(): string {
    return this.resourcesService.getSrc(this.track.audio.resource);
  }

  getParametersModel(): ParametersModel {
    return trackAudioParametersModel;
  }

  onParameterChanged(): void {
    this.samplerService.updateTrack(this.track);
  }
}
