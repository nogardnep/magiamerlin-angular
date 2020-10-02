import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Metronome } from 'src/app/models/system/sequencer/Metronome.model';
import { PatternEventActions, PatternEvent } from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { PatternWrapper } from 'src/app/models/wrapper/PatternWrapper.model';
import { PatternsService } from 'src/app/services/sequencer/patterns.service';
import { TimeSignature } from 'src/app/models/entity/TimeSignature.model';
import { PositionWrapper } from 'src/app/models/wrapper/PositionWrapper.model';
import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';

@Injectable({
  providedIn: 'root',
})
export class SequencerService {
  private positionWrapper: PositionWrapper;
  private playing: boolean;
  private metronome: Metronome;

  positionSubject: Subject<Position>;
  playingSubject: Subject<boolean>;

  constructor(
    private audioSamplerService: AudioSamplerService,
    private patternsService: PatternsService
  ) {
    this.positionSubject = new Subject<Position>();
    this.playingSubject = new Subject<boolean>();

    this.metronome = new Metronome(500, () => {
      this.move({
        tick: 1,
        beat: 0,
        mesure: 0,
      } as Position);
    });

    this.positionWrapper = new PositionWrapper(
      {
        tick: 0,
        beat: 0,
        mesure: 0,
      } as Position,
      {
        step: 4,
        beat: 4,
        mesure: 1,
      } as TimeSignature // TODO: temp
    );

    this.playing = false;
  }

  emitPositionSubject(): void {
    this.positionSubject.next(this.positionWrapper.getPosition());
  }

  emitPlayingSubject(): void {
    this.playingSubject.next(this.playing);
  }
  move(position: Position): void {
    this.patternsService.patternWrappers.forEach(
      (patternWrapper: PatternWrapper) => {
        patternWrapper.getPattern().events.forEach((event: PatternEvent) => {
          if (
            this.positionWrapper.isSameAs(event.position) &&
            event.action === PatternEventActions.Play
          ) {
            this.audioSamplerService.playTrack(event.trackNum);
          }
        });
      }
    );

    this.positionWrapper.move(position);

    this.emitPositionSubject();
  }

  play(): void {
    this.setPlaying(true);
    this.emitPlayingSubject();
    this.metronome.start();
  }

  pause(): void {
    this.setPlaying(false);
    this.metronome.stop();
  }

  setPlaying(playing: boolean): void {
    this.playing = playing;
    this.emitPlayingSubject();
  }
}
