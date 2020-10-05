import { MidiService } from './../midi/midi.service';
import { Clock } from 'src/app/models/system/sequencer/Clock.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  patternParametersModel,
  TriggerMode,
} from 'src/app/models/entity/Pattern.model';
import {
  PatternEvent,
  PatternEventActions,
} from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { TimeSignature } from 'src/app/models/entity/TimeSignature.model';
import { ControlModeEnum } from 'src/app/models/system/control/ControlMode.model';
import { PatternWrapper } from 'src/app/models/wrapper/PatternWrapper.model';
import { PositionWrapper } from 'src/app/models/wrapper/PositionWrapper.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { SelectionService } from 'src/app/services/control/selection.service';
import { ParametersService } from 'src/app/services/parameters/parameters.service';
import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';
import { MetronomeService } from 'src/app/services/sequencer/metronome.service';
import { PatternsService } from 'src/app/services/sequencer/patterns.service';

@Injectable({
  providedIn: 'root',
})
export class SequencerService {
  private positionMark: PositionWrapper;
  private playing: boolean;
  private socket;
  private clock: Clock;

  positionMarkSubject: Subject<PositionWrapper> = new Subject<
    PositionWrapper
  >();
  playingSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private audioSamplerService: AudioSamplerService,
    private patternsService: PatternsService,
    private selectionService: SelectionService,
    private parametersService: ParametersService,
    private metronomeService: MetronomeService,
    private audioService: AudioService,
    private midiService: MidiService
  ) {
    this.metronomeService.loadSounds();

    this.clock = new Clock(100, () => {
      console.log('tick');
      this.onTick();
    });

    // this.clock.start();

    this.initPositionMark();
  }

  private onTick(): void {
    this.move(
      {
        tick: 3,
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
    this.clock.start();
  }

  pause(): void {
    this.setPlaying(false);
    this.clock.stop();
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
