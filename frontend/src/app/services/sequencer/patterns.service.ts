import { Injectable } from '@angular/core';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { PatternEvent } from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { Track } from 'src/app/models/entity/Track.model';
import { PatternWrapper } from 'src/app/models/wrapper/PatternWrapper.model';

@Injectable({
  providedIn: 'root',
})
export class PatternsService {
  private patternWrappers: PatternWrapper[];

  constructor() {
    this.patternWrappers = [];
  }

  initPatterns(patterns: Pattern[]): void {
    patterns.forEach((pattern: Pattern) => {
      this.patternWrappers.push(new PatternWrapper(pattern));
    });
  }

  getPatternWrappers(): PatternWrapper[] {
    return this.patternWrappers;
  }

  getPatternWrapper(pattern: Pattern): PatternWrapper {
    let found: PatternWrapper = null;

    this.patternWrappers.forEach((patternWrapper: PatternWrapper) => {
      if (patternWrapper.isSameAs(pattern)) {
        found = patternWrapper;
      }
    });

    return found;
  }

  getPatternEvent(
    position: Position,
    pattern: Pattern,
    track: Track
  ): PatternEvent {
    let found: PatternEvent = null;

    if (track !== null) {
      found = new PatternWrapper(pattern).getEvent(position, track);
    }

    return found;
  }

  createPatternEvent(
    position: Position,
    pattern: Pattern,
    track: Track
  ): PatternEvent {
    const newEvent = {
      action: 0,
      parameters: {
        velocity: 1,
      },
      position,
      trackNum: track.num,
      bankNum: track.bank,
    } as PatternEvent;

    pattern.events.push(newEvent);

    return newEvent;
  }
}
