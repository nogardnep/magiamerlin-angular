import { PatternEvent } from 'src/app/models/entity/PatternEvent.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pattern-event',
  templateUrl: './pattern-event.component.html',
  styleUrls: ['./pattern-event.component.scss'],
})
export class PatternEventComponent implements OnInit {
  @Input() event: PatternEvent;

  constructor() {}

  ngOnInit(): void {}
}
