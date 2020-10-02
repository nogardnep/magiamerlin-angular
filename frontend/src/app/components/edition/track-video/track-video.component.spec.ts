import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackVideoComponent } from './track-video.component';

describe('TrackVideoComponent', () => {
  let component: TrackVideoComponent;
  let fixture: ComponentFixture<TrackVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
