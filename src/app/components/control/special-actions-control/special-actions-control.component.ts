import { SpecialActionsService } from 'src/app/services/control/special-actions.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-special-actions-control',
  templateUrl: './special-actions-control.component.html',
  styleUrls: ['./special-actions-control.component.scss'],
})
export class SpecialActionsControlComponent implements OnInit, OnDestroy {
  looping: boolean;
  editing: boolean;

  private loopingSubcription: Subscription;
  private editingSubcription: Subscription;

  constructor(private specialActionsService: SpecialActionsService) {}

  ngOnInit(): void {
    this.loopingSubcription = this.specialActionsService.loopingSubject.subscribe(
      (looping: boolean) => {
        this.looping = looping;
      }
    );
    this.specialActionsService.emitLooping();

    this.editingSubcription = this.specialActionsService.editingSubject.subscribe(
      (editing: boolean) => {
        this.editing = editing;
      }
    );
    this.specialActionsService.emitEditing();
  }

  ngOnDestroy(): void {
    this.loopingSubcription.unsubscribe();
  }

  onChangeLooping(value: boolean): void {
    this.specialActionsService.setLooping(value);
  }

  onChangeEditing(value: boolean): void {
    this.specialActionsService.setEditing(value);
  }

  onClickTest(): void {
    // TODO: remove
    this.specialActionsService.setLooping(true);
  }
}
