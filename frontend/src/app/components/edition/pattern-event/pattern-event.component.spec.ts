import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternEventComponent } from './pattern-event.component';

describe('PatternEventComponent', () => {
  let component: PatternEventComponent;
  let fixture: ComponentFixture<PatternEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
