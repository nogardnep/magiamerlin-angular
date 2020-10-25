import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternSheetEventComponent } from './pattern-sheet-event.component';

describe('PatternSheetEventComponent', () => {
  let component: PatternSheetEventComponent;
  let fixture: ComponentFixture<PatternSheetEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternSheetEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternSheetEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
