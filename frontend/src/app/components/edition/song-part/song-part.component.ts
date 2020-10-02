import { Component, Input, OnInit } from '@angular/core';
import { SongPart } from 'src/app/models/entity/SongPart.model';

@Component({
  selector: 'app-song-part',
  templateUrl: './song-part.component.html',
  styleUrls: ['./song-part.component.scss'],
})
export class SongPartComponent implements OnInit {
  @Input() songPart: SongPart;

  constructor() {}

  ngOnInit(): void {}
}
