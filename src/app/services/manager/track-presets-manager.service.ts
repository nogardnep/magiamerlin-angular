import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';
import { SelectionService } from 'src/app/services/control/selection.service';
import { TrackPreset } from 'src/models/entity/TrackPreset.mode';
import { TrackPresetsDataService } from 'src/app/services/data/track-presets-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TrackPresetsManagerService {
  constructor(
    private router: Router,
    private tracksPresetsDataService: TrackPresetsDataService,
    private audioSamplerService: AudioSamplerService,
    private selectionService: SelectionService
  ) {}
  explore(): void {
    this.router.navigate(['/tracks-preset-loader']); // TODO: do not use string
  }

  loadPreset(preset: TrackPreset): void {
    this.selectionService.getSelectedProject().tracks = preset.tracks;
    this.audioSamplerService.initSamplerTracks(preset.tracks);
  }

  loadPresets(): Promise<TrackPreset[]> {
    return this.tracksPresetsDataService.load();
  }

  deletePreset(preset: TrackPreset): Promise<object> {
    return this.tracksPresetsDataService.delete(preset);
  }

  createPreset(): void {
    const name = prompt('Preset name?');

    if (name !== null && name !== '') {
      const newPreset = {
        name,
        tracks: this.selectionService.getSelectedProject().tracks,
      } as TrackPreset;

      this.tracksPresetsDataService.add(newPreset);
    }
  }

  private getPresets(): void {}
}
