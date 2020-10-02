import { ResourcesDataService } from 'src/app/services/data/resources-data.service';
import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';
import { Router } from '@angular/router';
import { Track } from 'src/app/models/entity/Track.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-audio',
  templateUrl: './track-audio.component.html',
  styleUrls: ['./track-audio.component.scss']
})
export class TrackAudioComponent {
  @Input() track: Track;

  constructor(
    private router: Router,
    private audioSamplerService: AudioSamplerService,
    private resourcesService: ResourcesDataService) { }

  onClickLoadSound(): void {
    this.router.navigate(['/track-audio-loader']); // TODO: do not use string
  }

  onClickEmptySound(): void {
    this.track.audio.resource = null;
    this.audioSamplerService.updateTrack(this.track);
  }

  getAudioSrc(): string {
    return this.resourcesService.getSrc(this.track.audio.resource);
  }

}
