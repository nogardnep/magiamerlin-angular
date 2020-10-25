import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternSheetComponent } from './pattern-sheet.component';

describe('PatternSheetComponent', () => {
  let component: PatternSheetComponent;
  let fixture: ComponentFixture<PatternSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
