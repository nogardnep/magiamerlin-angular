import { TrackPresetsManagerService } from 'src/app/services/manager/track-presets-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracks-presets-control',
  templateUrl: './tracks-presets-control.component.html',
  styleUrls: ['./tracks-presets-control.component.scss'],
})
export class TracksPresetsControlComponent {
  constructor(private tracksPresetsService: TrackPresetsManagerService) {}
  onClickCreate(): void {
    this.tracksPresetsService.createPreset();
  }

  onClickExplore(): void {
    this.tracksPresetsService.explore();
  }
}
