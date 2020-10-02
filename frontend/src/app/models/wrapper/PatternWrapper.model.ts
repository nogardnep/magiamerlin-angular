import { Track } from 'src/app/models/entity/Track.model';
import { PatternEvent } from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { PositionWrapper } from './PositionWrapper.model';

export class PatternWrapper {
  private playing: boolean;
  private positionWrapper: PositionWrapper;

  constructor(private pattern: Pattern) {
    this.playing = false;
    this.positionWrapper = new PositionWrapper(
      {
        tick: 0,
        beat: 0,
        mesure: 0,
      } as Position,
      pattern.timeSignature
    );
  }

  getPositionWrapper(): PositionWrapper {
    return this.positionWrapper;
  }

  getPattern(): Pattern {
    return this.pattern;
  }

  getEvent(position: Position, track: Track): PatternEvent {
    let found: PatternEvent = null;

    if (track !== null) {
      const searchedPosition = new PositionWrapper(position, null);

      this.pattern.events.forEach((event: PatternEvent) => {
      if (
        track.num === event.trackNum &&
        track.bank === event.bankNum &&
        searchedPosition.isSameAs(event.position)
      ) {
        found = event;
      }
      });
    }

    return found;
  }

  createPatternEvent(
    position: Position,
    pattern: Pattern,
    trackNum: number,
    bankNum: number
  ): PatternEvent {
    const newEvent = {
      action: 0,
      position,
      trackNum,
      bankNum,
      parameters: {
        velocity: 1,
      },
    } as PatternEvent;

    pattern.events.push(newEvent);

    return newEvent;
  }
}
