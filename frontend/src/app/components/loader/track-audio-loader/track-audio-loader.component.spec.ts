import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTrackLoaderComponent } from './track-audio-loader.component';

describe('AudioTrackLoaderComponent', () => {
  let component: AudioTrackLoaderComponent;
  let fixture: ComponentFixture<AudioTrackLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTrackLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTrackLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
