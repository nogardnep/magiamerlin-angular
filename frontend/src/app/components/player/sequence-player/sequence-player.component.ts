import { SelectionService } from 'src/app/services/control/selection.service';
import { Sequence } from 'src/app/models/entity/Sequence.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sequence-player',
  templateUrl: './sequence-player.component.html',
  styleUrls: ['./sequence-player.component.scss'],
})
export class SequencePlayerComponent implements OnInit {
  @Input() sequences: Sequence[];

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {}

  getSequences(): Sequence[] {
    // TODO: sort by num
    const sequencesToDisplay = [];

    this.sequences.forEach((sequence: Sequence) => {
      sequencesToDisplay.push(sequence);
    });

    return sequencesToDisplay;
  }

  onClickSequence(sequence: Sequence): void {}
}
