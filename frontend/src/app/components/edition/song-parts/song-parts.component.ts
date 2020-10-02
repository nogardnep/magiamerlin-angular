import { SelectionService } from 'src/app/services/control/selection.service';
import { SongPart } from 'src/app/models/entity/SongPart.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-parts',
  templateUrl: './song-parts.component.html',
  styleUrls: ['./song-parts.component.scss'],
})
export class SongPartsComponent implements OnInit {
  @Input() songParts: SongPart[];
  @Input() selectedSongPart: SongPart;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {}

  getSongParts(): SongPart[] {
    // TODO: sort by num
    return this.songParts;
  }

  onClickSongPart(songPart: SongPart): void {
    this.selectionService.selectSongPart(songPart);
  }
}
