import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternStepComponent } from './pattern-step.component';

describe('PatternStepComponent', () => {
  let component: PatternStepComponent;
  let fixture: ComponentFixture<PatternStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
