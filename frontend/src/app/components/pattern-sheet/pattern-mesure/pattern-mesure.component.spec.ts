import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternMesureComponent } from './pattern-mesure.component';

describe('PatternMesureComponent', () => {
  let component: PatternMesureComponent;
  let fixture: ComponentFixture<PatternMesureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternMesureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
