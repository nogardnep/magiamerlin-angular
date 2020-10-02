import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionControlComponent } from './selection-control.component';

describe('ControlPanelComponent', () => {
  let component: SelectionControlComponent;
  let fixture: ComponentFixture<SelectionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
