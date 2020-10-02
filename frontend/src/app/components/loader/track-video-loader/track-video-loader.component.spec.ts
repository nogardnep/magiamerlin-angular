import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackVideoLoaderComponent } from './track-video-loader.component';

describe('TrackVideoLoaderComponent', () => {
  let component: TrackVideoLoaderComponent;
  let fixture: ComponentFixture<TrackVideoLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackVideoLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackVideoLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
