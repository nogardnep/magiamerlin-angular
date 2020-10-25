import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksPresetExplorerComponent } from './tracks-preset-explorer.component';

describe('TracksPresetExplorerComponent', () => {
  let component: TracksPresetExplorerComponent;
  let fixture: ComponentFixture<TracksPresetExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TracksPresetExplorerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksPresetExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
