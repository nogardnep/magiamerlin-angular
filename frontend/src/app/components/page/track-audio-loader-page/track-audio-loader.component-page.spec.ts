import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAudioLoaderPageComponent } from './track-audio-loader-page.component';

describe('AudioTrackLoaderPageComponent', () => {
  let component: TrackAudioLoaderPageComponent;
  let fixture: ComponentFixture<TrackAudioLoaderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackAudioLoaderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAudioLoaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
