import { PatternsService } from 'src/app/services/sequencer/patterns.service';
import { PatternWrapper } from 'src/app/models/wrapper/PatternWrapper.model';
import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { configuration } from 'src/app/config/config';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { PatternEvent } from 'src/app/models/entity/PatternEvent.model';
import { Track } from 'src/app/models/entity/Track.model';
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

  getTickNumber(): number {
    return configuration.sequencer.ticksByBeat;
  }
}
