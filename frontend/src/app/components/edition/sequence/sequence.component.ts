import { ParametersModel } from 'src/app/models/Parameter';
import { Sequence, sequenceParametersModel } from 'src/app/models/entity/Sequence.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss'],
})
export class SequenceComponent implements OnInit {
  @Input() sequence: Sequence;

  constructor() {}

  ngOnInit(): void {}

  getParametersModel(): ParametersModel {
    return sequenceParametersModel;
  }
}
