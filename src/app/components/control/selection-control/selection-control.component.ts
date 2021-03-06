import { configuration } from 'src/app/config/config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ControlMode,
  ControlModeEnum,
} from 'src/models/system/control/ControlMode.model';
import { Pattern } from 'src/models/entity/Pattern.model';
import { Sequence } from 'src/models/entity/Sequence.model';
import { Track } from 'src/models/entity/Track.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-selection-control',
  templateUrl: './selection-control.component.html',
  styleUrls: ['./selection-control.component.scss'],
})
export class SelectionControlComponent implements OnInit, OnDestroy {
  sequenceNum: number;
  patternNum: number;
  trackNum: number;
  bankNum: number;
  configuration = configuration;

  private selectedSequenceSubscription: Subscription;
  private selectedPatternSubscription: Subscription;
  private selectedTrackSubscription: Subscription;
  private selectedBankSubscription: Subscription;

  constructor(private selectionService: SelectionService) {
    this.sequenceNum = configuration.entities.firstNum;
    this.patternNum = configuration.entities.firstNum;
    this.trackNum = configuration.entities.firstNum;
    this.bankNum = configuration.entities.firstNum;
  }

  ngOnInit(): void {
    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        if (sequence !== null) {
          this.sequenceNum = sequence.num;
        }
      }
    );

    this.selectedPatternSubscription = this.selectionService.selectedPatternSubject.subscribe(
      (pattern: Pattern) => {
        if (pattern !== null) {
          this.patternNum = pattern.num;
        }
      }
    );

    this.selectedTrackSubscription = this.selectionService.selectedTrackSubject.subscribe(
      (track: Track) => {
        if (track !== null) {
          this.trackNum = track.num;
        }
      }
    );

    this.selectedBankSubscription = this.selectionService.selectedBankSubject.subscribe(
      (bank: number) => {
        if (bank !== null) {
          this.bankNum = bank;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedSequenceSubscription.unsubscribe();
    this.selectedPatternSubscription.unsubscribe();
    this.selectedTrackSubscription.unsubscribe();
    this.selectedBankSubscription.unsubscribe();
  }

  getMax(maxNumber: number): number {
    return maxNumber - 1 + configuration.entities.firstNum;
  }

  getMin(): number {
    return configuration.entities.firstNum;
  }

  onChangeSequenceNum(value: number): void {
    this.selectionService.selectSequenceByNum(+value);
  }

  onChangePatternNum(value: number): void {
    this.selectionService.selectPatternByNum(+value, this.bankNum);
  }

  onChangeTrackNum(value: number): void {
    this.selectionService.selectTrackByNum(+value, this.bankNum);
  }

  onChangeBankNum(value: number): void {
    this.selectionService.selectBank(+value);
    this.selectionService.selectPatternByNum(this.patternNum, +value);
    this.selectionService.selectTrackByNum(this.trackNum, +value);
  }

  getModes(): ControlMode[] {
    const modes: ControlMode[] = [];

    Object.keys(ControlModeEnum).forEach((item: string) => {
      modes.push(new ControlMode(item));
    });

    return modes;
  }

  onClickMode(mode: ControlMode): void {
    this.selectionService.selectMode(mode);
  }

  modeIsSelected(mode: ControlMode): boolean {
    return (
      this.selectionService.getSelectedMode() !== null &&
      mode.type === this.selectionService.getSelectedMode().type
    );
  }
}
