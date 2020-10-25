import { ParametersModel } from 'src/models/Parameter';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Pattern,
  patternParametersModel,
} from 'src/models/entity/Pattern.model';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss'],
})
export class PatternComponent implements OnInit, OnDestroy {
  @Input() pattern: Pattern;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  getParametersModel(): ParametersModel {
    return patternParametersModel;
  }
}
