import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Track } from 'src/models/entity/Track.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-track-loader',
  templateUrl: './track-audio-loader-page.component.html',
  styleUrls: ['./track-audio-loader-page.component.scss'],
})
export class TrackAudioLoaderPageComponent implements OnInit, OnDestroy {
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
