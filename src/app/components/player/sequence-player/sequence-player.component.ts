import { Component, Input, OnInit } from '@angular/core';
import { Sequence } from 'src/models/entity/Sequence.model';

@Component({
  selector: 'app-sequence-player',
  templateUrl: './sequence-player.component.html',
  styleUrls: ['./sequence-player.component.scss'],
})
export class SequencePlayerComponent implements OnInit {
  @Input() sequences: Sequence[];

  constructor() {}

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
