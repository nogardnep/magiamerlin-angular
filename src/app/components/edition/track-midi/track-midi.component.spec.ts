import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMidiComponent } from './track-midi.component';

describe('TrackMidiComponent', () => {
  let component: TrackMidiComponent;
  let fixture: ComponentFixture<TrackMidiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackMidiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMidiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
