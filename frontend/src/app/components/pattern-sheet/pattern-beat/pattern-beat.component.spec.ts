import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternBeatComponent } from './pattern-beat.component';

describe('PatternBeatComponent', () => {
  let component: PatternBeatComponent;
  let fixture: ComponentFixture<PatternBeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternBeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternBeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
