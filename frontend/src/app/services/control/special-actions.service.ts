import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpecialActionsService {
  private looping = false;

  loopingSubject = new Subject<boolean>();

  constructor() {}

  emitLooping(): void {
    this.loopingSubject.next(this.looping);
  }

  isLooping(): boolean {
    return this.looping;
  }

  setLooping(looping: boolean): void {
    this.looping = looping;
    this.emitLooping();
  }
}
