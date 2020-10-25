import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackVideoLoaderPageComponent } from './track-video-loader-page.component';

describe('TrackVideoLoaderPageComponent', () => {
  let component: TrackVideoLoaderPageComponent;
  let fixture: ComponentFixture<TrackVideoLoaderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackVideoLoaderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackVideoLoaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
