import { Track } from 'src/app/models/entity/Track.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track-midi',
  templateUrl: './track-midi.component.html',
  styleUrls: ['./track-midi.component.scss'],
})
export class TrackMidiComponent implements OnInit {
  @Input() track: Track;

  constructor() {}

  ngOnInit(): void {}
}
