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

  private loopingSubcription: Subscription;

  constructor(private specialActionsService: SpecialActionsService) {}

  ngOnInit(): void {
    this.loopingSubcription = this.specialActionsService.loopingSubject.subscribe(
      (loopAction: boolean) => {
        this.looping = loopAction;
      }
    );

    this.specialActionsService.emitLooping();
  }

  ngOnDestroy(): void {
    this.loopingSubcription.unsubscribe();
  }

  onChangeLooping(value: boolean): void {
    this.specialActionsService.setLooping(value);
  }

  onClickTest(): void {
    // TODO: remove
    this.specialActionsService.setLooping(true);
  }
}
