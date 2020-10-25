import { SongPart } from 'src/models/entity/SongPart.model';
import { ControlMode, ControlModeEnum } from 'src/models/system/control/ControlMode.model';
import { Pattern } from 'src/models/entity/Pattern.model';
import { Sequence } from 'src/models/entity/Sequence.model';
import { Track } from 'src/models/entity/Track.model';
import { Subscription } from 'rxjs';
import { SelectionService } from 'src/app/services/control/selection.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'src/models/entity/Project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  @Input() project: Project;

  private selectedSongPartSubscription: Subscription;
  private selectedSequenceSubscription: Subscription;
  private selectedPatternSubscription: Subscription;
  private selectedTrackSubscription: Subscription;
  private selectedModeSubscription: Subscription;

  selectedSongPart: SongPart = null;
  selectedSequence: Sequence = null;
  selectedPattern: Pattern = null;
  selectedTrack: Track = null;
  selectedMode: ControlMode = null;

  modeEnum = ControlModeEnum;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {
    this.selectedSongPartSubscription = this.selectionService.selectedSongPartSubject.subscribe(
      (songPart: SongPart) => {
        this.selectedSongPart = songPart;
      }
    );

    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        this.selectedSequence = sequence;
      }
    );

    this.selectedPatternSubscription = this.selectionService.selectedPatternSubject.subscribe(
      (pattern: Pattern) => {
        this.selectedPattern = pattern;
      }
    );

    this.selectedTrackSubscription = this.selectionService.selectedTrackSubject.subscribe(
      (audioTrack: Track) => {
        this.selectedTrack = audioTrack;
      }
    );

    this.selectedModeSubscription = this.selectionService.selectedModeSubject.subscribe(
      (mode: ControlMode) => {
        this.selectedMode = mode;
      }
    );

    this.selectionService.emitSelectedSongPart();
    this.selectionService.emitSelectedSequence();
    this.selectionService.emitSelectedPattern();
    this.selectionService.emitSelectedTrack();
    this.selectionService.emitSelectedMode();
  }

  ngOnDestroy(): void {
    this.selectedSongPartSubscription.unsubscribe();
    this.selectedPatternSubscription.unsubscribe();
    this.selectedSequenceSubscription.unsubscribe();
    this.selectedTrackSubscription.unsubscribe();
    this.selectedModeSubscription.unsubscribe();
  }

  inMode(mode: ControlModeEnum): boolean {
    return (
      this.selectedMode !== null &&
      ControlModeEnum[this.selectedMode.type] === mode
    );
  }
}
