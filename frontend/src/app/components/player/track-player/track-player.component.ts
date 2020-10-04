import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/entity/Track.model';
import { SelectionService } from 'src/app/services/control/selection.service';
import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';

@Component({
  selector: 'app-track-player',
  templateUrl: './track-player.component.html',
  styleUrls: ['./track-player.component.scss'],
})
export class TrackPlayerComponent implements OnInit {
  @Input() tracks: Track[];


  constructor(
    private audioSamplerService: AudioSamplerService,
    private selectionService: SelectionService
  ) {}

  ngOnInit(): void {}

  onClickTrack(track: Track): void {
      this.audioSamplerService.playSamplerTrack(track.num);
  }

  getTracks(): Track[] {
    const tracksToDisplay: Track[] = [];

    this.tracks.forEach((track: Track) => {
      if (track.bank === this.selectionService.getSelectedBank()) {
        tracksToDisplay.push(track);
      }
    });

    return tracksToDisplay;
  }
}
