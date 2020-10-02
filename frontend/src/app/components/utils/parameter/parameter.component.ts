import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
})
export class ParameterComponent implements OnInit {
  @Input() name: string;
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() model: number;

  constructor() {}

  ngOnInit(): void {
    console.log(this.model['timeSignature.step'])
  }

  valueChanged(value: number): void {
    // this.property = value;
  }
}
