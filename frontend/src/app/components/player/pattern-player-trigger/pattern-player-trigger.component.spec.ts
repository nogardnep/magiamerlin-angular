import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternPlayerTriggerComponent } from './pattern-player-trigger.component';

describe('PatternPlayerTriggerComponent', () => {
  let component: PatternPlayerTriggerComponent;
  let fixture: ComponentFixture<PatternPlayerTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternPlayerTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternPlayerTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
