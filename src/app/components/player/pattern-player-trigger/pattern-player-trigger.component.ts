import { Component, Input, OnChanges } from '@angular/core';
import { Pattern } from 'src/models/entity/Pattern.model';
import { PatternWrapper } from 'src/models/wrapper/PatternWrapper.model';
import { SpecialActionsService } from 'src/app/services/control/special-actions.service';
import { PatternsService } from 'src/app/services/sequencer/patterns.service';

@Component({
  selector: 'app-pattern-player-trigger',
  templateUrl: './pattern-player-trigger.component.html',
  styleUrls: ['./pattern-player-trigger.component.scss'],
})
export class PatternPlayerTriggerComponent implements OnChanges {
  @Input() pattern: Pattern;
  patternWrapper: PatternWrapper = null;

  constructor(
    private patternsService: PatternsService,
    private specialActionsService: SpecialActionsService
  ) {}

  ngOnChanges(): void {
    this.patternWrapper = this.patternsService.getPatternWrapper(this.pattern);
  }

  onClickTrigger(): void {
    if (this.patternWrapper.isPlaying()) {
      if (this.specialActionsService.isLooping()) {
        this.patternWrapper.setLooping(!this.patternWrapper.isLooping());
      } else {
        this.patternWrapper.setArmedForStopping(
          !this.patternWrapper.isArmedForStopping()
        );
      }
    } else {
      if (!this.patternWrapper.isArmedForPlaying()) {
        this.patternWrapper.setArmedForPlaying(true);
        this.patternWrapper.setLooping(this.specialActionsService.isLooping());
      } else {
        if (this.specialActionsService.isLooping()) {
          this.patternWrapper.setLooping(!this.patternWrapper.isLooping());
        } else {
          this.patternWrapper.setArmedForPlaying(false);
          this.patternWrapper.setLooping(false);
        }
      }
    }
  }

  getButtonText(): string {
    // TODO: temp

    let text: string;

    if (this.patternWrapper.isArmedForStopping()) {
      text = '!';
    } else if (this.patternWrapper.isArmedForPlaying()) {
      if (this.patternWrapper.isLooping()) {
        text = '>';
      } else {
        text = '?';
      }
    } else if (this.patternWrapper.isPlaying()) {
      if (this.patternWrapper.isLooping()) {
        text = 'o';
      } else {
        text = 'x';
      }
    } else {
      text = '_';
    }

    return text;
  }
}
