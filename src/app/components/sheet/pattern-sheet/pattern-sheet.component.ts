import { PatternsService } from 'src/app/services/sequencer/patterns.service';
import { PatternWrapper } from 'src/models/wrapper/PatternWrapper.model';
import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { configuration } from 'src/app/config/config';
import { Pattern } from 'src/models/entity/Pattern.model';
import { PatternEvent } from 'src/models/entity/PatternEvent.model';
import { Track } from 'src/models/entity/Track.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-pattern-sheet',
  templateUrl: './pattern-sheet.component.html',
  styleUrls: ['./pattern-sheet.component.scss'],
})
export class PatternSheetComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pattern: Pattern;
  patternWrapper: PatternWrapper = null;
  selectedEvent: PatternEvent = null;
  track: Track = null;

  private selectedTrackSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private patternsService: PatternsService
  ) {}

  ngOnInit(): void {
    this.selectedTrackSubscription = this.selectionService.selectedTrackSubject.subscribe(
      (track: Track) => {
        this.track = track;
      }
    );

    this.selectionService.emitSelectedTrack();
  }

  ngOnChanges(): void {
    this.patternWrapper = this.patternsService.getPatternWrapper(this.pattern);
  }

  ngOnDestroy(): void {
    this.selectedTrackSubscription.unsubscribe();
  }

  getTicksByBeat(): number {
    return configuration.sequencer.ticksByBeat;
  }

  displayEvent(tick: number): boolean {
    // TODO: ugly
    let modulo: number;

    if (this.pattern.timeSignature.step === 3) {
      modulo = 4;
    } else if (this.pattern.timeSignature.step === 4) {
      modulo = 3;
    } else {
      modulo = 1;
    }
    return tick % modulo === 0;
  }
}
