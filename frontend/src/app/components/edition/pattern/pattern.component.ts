import { ParametersModel } from 'src/app/models/Parameter';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Pattern,
  patternParametersModel,
} from 'src/app/models/entity/Pattern.model';
import { PositionWrapper } from 'src/app/models/wrapper/PositionWrapper.model';
import { SequencerService } from 'src/app/services/sequencer/sequencer.service';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss'],
})
export class PatternComponent implements OnInit, OnDestroy {
  @Input() pattern: Pattern;

  private sequencerPositionSubscription: Subscription;

  constructor(private sequencerService: SequencerService) {}

  ngOnInit(): void {
    this.sequencerPositionSubscription = this.sequencerService.positionMarkSubject.subscribe(
      (positionWrapper: PositionWrapper) => {
        // TODO
      }
    );
  }

  ngOnDestroy(): void {
    this.sequencerPositionSubscription.unsubscribe();
  }

  getParametersModel(): ParametersModel {
    return patternParametersModel;
  }
}
