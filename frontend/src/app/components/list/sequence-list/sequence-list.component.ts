import { Component, Input } from '@angular/core';
import { Sequence } from 'src/app/models/entity/Sequence.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.scss'],
})
export class SequenceListComponent {
  @Input() sequences: Sequence[];

  constructor(private projectsService: SelectionService) {}

  onClickSequence(sequence: Sequence): void {
    this.projectsService.selectSequence(sequence);
  }

  isSelected(sequence: Sequence): boolean {
    return this.projectsService.getSelectedSequence() === sequence;
  }
}
