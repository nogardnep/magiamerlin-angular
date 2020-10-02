import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksPresetsControlComponent } from './tracks-presets-control.component';

describe('TracksPresetsControlComponent', () => {
  let component: TracksPresetsControlComponent;
  let fixture: ComponentFixture<TracksPresetsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksPresetsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksPresetsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
