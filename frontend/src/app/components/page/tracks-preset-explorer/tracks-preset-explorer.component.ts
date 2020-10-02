import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackPreset } from 'src/app/models/entity/TrackPreset.mode';
import { SelectionService } from 'src/app/services/control/selection.service';
import { TrackPresetsManagerService } from 'src/app/services/manager/track-presets-manager.service';

@Component({
  selector: 'app-tracks-preset-explorer',
  templateUrl: './tracks-preset-explorer.component.html',
  styleUrls: ['./tracks-preset-explorer.component.scss'],
})
export class TracksPresetExplorerComponent implements OnInit {
  focusedPreset: TrackPreset = null;
  presets: TrackPreset[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private tracksPresetsManagerService: TrackPresetsManagerService,
    private selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.initPresets();
  }

  private initPresets(): void {
    this.focusedPreset = null;

    this.tracksPresetsManagerService.loadPresets().then((presets: TrackPreset[]) => {
      this.presets = presets;
    });
  }

  onClickPreset(preset: TrackPreset): void {
    this.focusedPreset = preset;
  }

  onClickLoad(): void {
    const confirmation = confirm('Are you sure? (this will overwrite tracks of the current project)');

    if (confirmation) {
      if (this.focusedPreset !== null) {
        this.tracksPresetsManagerService.loadPreset(this.focusedPreset);
        this.router.navigate(['/project']); // TODO: do not use string
      }
    }
  }

  onClickSave(): void {
    const confirmation = confirm('Are you sure? (this will overwrite the preset)');

    if (confirmation) {
      if (this.focusedPreset !== null) {
        this.tracksPresetsManagerService.loadPreset(this.focusedPreset);
        this.router.navigate(['/project']); // TODO: do not use string
      }
    }
  }

  onClickCancel(): void {
    this.location.back();
  }

  onClickDelete(preset: TrackPreset): void {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.tracksPresetsManagerService.deletePreset(preset).then(() => {
        this.initPresets();
      });
    }
  }

  isFocused(preset: TrackPreset): boolean {
    if (this.focusedPreset !== null) {
      return preset.name === this.focusedPreset.name;
    }
  }
}
