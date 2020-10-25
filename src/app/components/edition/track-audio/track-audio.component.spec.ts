import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAudioComponent } from './track-audio.component';

describe('TrackAudioComponent', () => {
  let component: TrackAudioComponent;
  let fixture: ComponentFixture<TrackAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
