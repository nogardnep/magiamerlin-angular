import { Subscription } from 'rxjs';
import { SequencerService } from 'src/app/services/sequencer/sequencer.service';
import { PatternsService } from 'src/app/services/sequencer/patterns.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { PatternEvent } from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss'],
})
export class PatternComponent implements OnInit, OnDestroy {
  @Input() pattern: Pattern;
  selectedEvent: PatternEvent = null;
  sequencerPositionSubscription: Subscription;

  constructor(
    private projectsService: SelectionService,
    private patternsService: PatternsService,
    private sequencerService: SequencerService
  ) {}

  ngOnInit(): void {
    this.sequencerPositionSubscription = this.sequencerService.positionSubject.subscribe(
      (position: Position) => {
        // TODO
      }
    );
  }

  ngOnDestroy(): void {
    this.sequencerPositionSubscription.unsubscribe();
  }

  onChangeEvent(position: Position, checked: boolean): void {
    const event = this.getEvent(position, true);

    event.action = checked ? 1 : 0;

    this.selectedEvent = event;
  }

  getEventState(position: Position): number {
    const event = this.getEvent(position, false);
    let state = 0;

    if (event !== null) {
      state = event.action;
    }

    return state;
  }

  isCrossed(position: Position): boolean {
    return false; // TODO
  }

  private getEvent(
    position: Position,
    createIfNotFound: boolean
  ): PatternEvent {
    let event: PatternEvent = null;
    const track = this.projectsService.getSelectedTrack();

    event = this.patternsService.getPatternEvent(
      position,
      this.pattern,
      track
    );

    if (event === null && createIfNotFound) {
      event = this.patternsService.createPatternEvent(
        position,
        this.pattern,
        track
      );
    }

    return event;
  }
}
