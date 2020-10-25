import { SelectionService } from 'src/app/services/control/selection.service';
import { Track } from 'src/models/entity/Track.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit {
  @Input() tracks: Track[];

  constructor(private projectsService: SelectionService) {}

  ngOnInit(): void {}

  onClickTrack(track: Track): void {
    this.projectsService.selectTrack(track);
  }

  isSelected(track: Track): boolean {
    return this.projectsService.getSelectedTrack() === track;
  }
}
