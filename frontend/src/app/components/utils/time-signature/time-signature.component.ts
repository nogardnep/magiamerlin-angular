import { Sheet } from 'src/app/models/entity/Sheet.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-time-signature',
  templateUrl: './time-signature.component.html',
  styleUrls: ['./time-signature.component.scss']
})
export class TimeSignatureComponent {
  @Input() model: Sheet;


  constructor() { }
}
