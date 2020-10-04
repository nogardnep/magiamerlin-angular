import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialActionsControlComponent } from './special-actions-control.component';

describe('SpecialActionsControlComponent', () => {
  let component: SpecialActionsControlComponent;
  let fixture: ComponentFixture<SpecialActionsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialActionsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialActionsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
