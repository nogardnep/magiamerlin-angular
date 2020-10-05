import { MetronomeService } from 'src/app/services/sequencer/metronome.service';
import { ParametersService } from 'src/app/services/parameters/parameters.service';
import { SelectionService } from 'src/app/services/control/selection.service';
import { Metronome } from 'node-metronome';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Timer } from 'src/app/models/system/sequencer/Timer.model';
import {
  PatternEventActions,
  PatternEvent,
} from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { PatternWrapper } from 'src/app/models/wrapper/PatternWrapper.model';
import { PatternsService } from 'src/app/services/sequencer/patterns.service';
import { TimeSignature } from 'src/app/models/entity/TimeSignature.model';
import { PositionWrapper } from 'src/app/models/wrapper/PositionWrapper.model';
import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';
import {
  ControlMode,
  ControlModeEnum,
} from 'src/app/models/system/control/ControlMode.model';
import {
  patternParametersModel,
  TriggerMode,
} from 'src/app/models/entity/Pattern.model';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SequencerService {
  private positionMark: PositionWrapper;
  private playing: boolean;
  private timer: Timer;
  private socket;

  positionMarkSubject: Subject<PositionWrapper> = new Subject<
    PositionWrapper
  >();
  playingSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private audioSamplerService: AudioSamplerService,
    private patternsService: PatternsService,
    private selectionService: SelectionService,
    private parametersService: ParametersService,
    private metronomeService: MetronomeService
  ) {
    this.metronomeService.loadSounds();

    this.timer = new Timer(120, () => {
      this.onTick();
    });

    this.initPositionMark();
  }

  private onTick(): void {
    this.move(
      {
        tick: 1,
      } as Position,
      false
    );
  }

  emitPositionMark(): void {
    this.positionMarkSubject.next(this.positionMark);
  }

  emitPlaying(): void {
    this.playingSubject.next(this.playing);
  }

  initPositionMark(): void {
    this.positionMark = new PositionWrapper(
      {
        tick: 0,
        beat: 0,
        mesure: 0,
        turn: 0,
      } as Position,
      {
        step: 4,
        beat: 4,
        mesure: 1,
      } as TimeSignature // TODO: temp
    );

    this.emitPositionMark();
  }

  move(progression: Position, silently: boolean): void {
    if (this.positionMark.onMesure()) {
      console.log('mesure');
      this.metronomeService.playMesureSound();
    } else if (this.positionMark.onBeat()) {
      console.log('beat');
      this.metronomeService.playBeatSound();
    }

    this.movePatterns(progression, silently);
    this.positionMark.move(progression);
    this.emitPositionMark();
  }

  play(): void {
    // TODO
    if (!this.playing) {
      if (this.selectionService.inMode(ControlModeEnum.PatternEdit)) {
        const pattern = this.patternsService.getPatternWrapper(
          this.selectionService.getSelectedPattern()
        );

        pattern.setArmedForPlaying(true);
        pattern.setLooping(true);
      }
    }

    this.setPlaying(true);
    this.emitPlaying();
    this.timer.start();
  }

  pause(): void {
    this.setPlaying(false);
    this.timer.stop();
  }

  stop(): void {
    this.pause();
    this.initPositionMark();
    this.patternsService
      .getPatternWrappers()
      .forEach((patternWrapper: PatternWrapper) => {
        patternWrapper.stop();
      });
    this.audioSamplerService.stopAllSamplerTrack();
  }

  setPlaying(playing: boolean): void {
    this.playing = playing;
    this.emitPlaying();
  }

  moveOnStep(backward = false): void {
    const progression = backward ? -1 : 1;

    let moveOn = true;

    while (moveOn) {
      this.move({ tick: progression } as Position, true);
      if (this.positionMark.getPosition().tick === 0) {
        moveOn = false;
      }
    }
  }

  private movePatterns(progression: Position, silently: boolean): void {
    this.patternsService
      .getPatternWrappers()
      .forEach((patternWrapper: PatternWrapper) => {
        if (patternWrapper.isPlaying()) {
          if (!silently) {
            this.playEvents(patternWrapper);
          }

          patternWrapper.move(progression);
        }

        this.checkTriggers(patternWrapper);
      });
  }

  private playEvents(patternWrapper: PatternWrapper): void {
    patternWrapper.getPattern().events.forEach((event: PatternEvent) => {
      if (
        patternWrapper.getPositionWrapper().isSameAs(event.position) &&
        event.action === PatternEventActions.Play
      ) {
        this.audioSamplerService.playSamplerTrack(
          event.trackNum,
          event.bankNum
        );
      }
    });
  }

  private checkTriggers(patternWrapper: PatternWrapper): void {
    let trigger = false;

    const triggerMode: TriggerMode = this.parametersService.getParameter(
      patternWrapper.getPattern(),
      patternParametersModel,
      'triggerMode'
    );

    switch (triggerMode) {
      case TriggerMode.OnTick:
        if (this.positionMark.onTick()) {
          trigger = true;
        }
        break;
      case TriggerMode.OnBeat:
        if (this.positionMark.onBeat()) {
          trigger = true;
        }
        break;
      case TriggerMode.OnMesure:
        if (this.positionMark.onMesure()) {
          trigger = true;
        }
        break;
    }

    if (trigger) {
      if (patternWrapper.isArmedForStopping()) {
        patternWrapper.stop();
      } else if (patternWrapper.isArmedForPlaying()) {
        patternWrapper.launch();
      }
    }
  }
}
