import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioSamplerComponent } from './audio-sampler.component';

describe('AudioSamplerComponent', () => {
  let component: AudioSamplerComponent;
  let fixture: ComponentFixture<AudioSamplerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioSamplerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioSamplerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
