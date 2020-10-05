import { Subscription } from 'rxjs';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import {
  PatternEvent,
  PatternEventActions,
} from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { Track } from 'src/app/models/entity/Track.model';
import { PatternWrapper } from 'src/app/models/wrapper/PatternWrapper.model';
import { PatternsService } from 'src/app/services/sequencer/patterns.service';

@Component({
  selector: 'app-pattern-sheet-event',
  templateUrl: './pattern-sheet-event.component.html',
  styleUrls: ['./pattern-sheet-event.component.scss'],
})
export class PatternSheetEventComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() position: Position;
  @Input() pattern: Pattern;
  @Input() track: Track;
  patternWrapper: PatternWrapper = null;
  event: PatternEvent = null;
  crossed = false;

  private positionSubscription: Subscription;

  constructor(private patternsService: PatternsService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.patternWrapper = this.patternsService.getPatternWrapper(this.pattern);
    this.event = this.getEvent(this.position, false);

    this.positionSubscription = this.patternWrapper.positionWrapperSubject.subscribe(
      () => {
        this.checkCrossed();
      }
    );
  }

  ngOnDestroy(): void {
    this.positionSubscription.unsubscribe();
  }

  onClickEvent(): void {
    if (this.event === null) {
      // TODO: ugly
      this.event = this.getEvent(this.position, true);
    }

    switch (this.event.action) {
      case PatternEventActions.Empty:
        this.event.action = PatternEventActions.Play;
        break;
      case PatternEventActions.Play:
        this.event.action = PatternEventActions.Empty;
        break;
      case PatternEventActions.Stop:
        this.event.action = PatternEventActions.Empty;
        break;
    }
  }

  getButtonText(): string {
    let text = '_';

    if (this.event !== null) {
      switch (this.event.action) {
        case PatternEventActions.Play:
          text = 'o';
          break;
        case PatternEventActions.Stop:
          text = 'x';
          break;
      }
    }

    return text;
  }

  private getEvent(
    position: Position,
    createIfNotFound: boolean
  ): PatternEvent {
    let event: PatternEvent = null;

    event = this.patternsService.getPatternEvent(
      position,
      this.pattern,
      this.track
    );

    if (event === null && createIfNotFound) {
      event = this.patternsService.createPatternEvent(
        position,
        this.pattern,
        this.track
      );
    }

    return event;
  }

  private checkCrossed(): void {
    // TODO
    // if (this.patternWrapper !== null && this.patternWrapper.isPlaying()) {
    //   if (this.patternWrapper.getPositionWrapper().isSameAs(this.position)) {
    //     this.crossed = true;
    //   } else {
    //     this.crossed = false;
    //   }
    // }
  }

  isCrossed(): boolean {
    let crossed = false;

    if (this.patternWrapper !== null && this.patternWrapper.isPlaying()) {
      if (this.patternWrapper.getPositionWrapper().isSameAs(this.position)) {
        crossed = true;
      }
    }

    return crossed;
  }
}
