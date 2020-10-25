import { SelectionService } from 'src/app/services/control/selection.service';
import { Track } from 'src/models/entity/Track.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-track-video-loader-page',
  templateUrl: './track-video-loader-page.component.html',
  styleUrls: ['./track-video-loader-page.component.scss'],
})
export class TrackVideoLoaderPageComponent implements OnInit, OnDestroy {
  track: Track = null;

  private trackSubscription: Subscription;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {
    this.trackSubscription = this.selectionService.selectedTrackSubject.subscribe(
      (track: Track) => {
        this.track = track;
      }
    );

    this.selectionService.emitSelectedTrack();
  }

  ngOnDestroy(): void {
    this.trackSubscription.unsubscribe();
  }
}
