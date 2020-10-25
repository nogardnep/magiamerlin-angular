import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpecialActionsService {
  private looping = false;
  private editing = false;

  loopingSubject = new Subject<boolean>();
  editingSubject = new Subject<boolean>();

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

  emitEditing(): void {
    this.editingSubject.next(this.editing);
  }

  isEditing(): boolean {
    return this.editing;
  }

  setEditing(editing: boolean): void {
    this.editing = editing;
    this.emitEditing();
  }
}
