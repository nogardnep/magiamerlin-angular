import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternPlayerComponent } from './pattern-player.component';

describe('PatternPlayerComponent', () => {
  let component: PatternPlayerComponent;
  let fixture: ComponentFixture<PatternPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
