import { PositionWrapper } from 'src/models/wrapper/PositionWrapper.model';
import { Subscription } from 'rxjs';
import { Position } from 'src/models/entity/Position.model';
import { SequencerService } from 'src/app/services/sequencer/sequencer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss'],
})
export class SequencerComponent implements OnInit, OnDestroy {
  position: Position;
  playing: boolean;

  private positionSubscription: Subscription;
  private playingSubscription: Subscription;

  constructor(private sequencerService: SequencerService) {}

  ngOnInit(): void {
    this.positionSubscription = this.sequencerService.positionMarkSubject.subscribe(
      (positionWrapper: PositionWrapper) => {
        this.position = positionWrapper.getPosition();
      }
    );

    this.playingSubscription = this.sequencerService.playingSubject.subscribe(
      (playing: boolean) => {
        this.playing = playing;
      }
    );

    this.sequencerService.emitPositionMark();
    this.sequencerService.emitPlaying();
  }

  ngOnDestroy(): void {
    this.playingSubscription.unsubscribe();
    this.positionSubscription.unsubscribe();
  }

  onClickPlay(): void {
    this.sequencerService.play();
  }

  onClickPause(): void {
    this.sequencerService.pause();
  }

  onClickStop(): void {
    this.sequencerService.stop();
  }

  onClickBackward(): void {
    this.sequencerService.moveOnStep(true);
  }

  onClickForward(): void {
    this.sequencerService.moveOnStep();
  }
}
