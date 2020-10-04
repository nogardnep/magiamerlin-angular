import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencePlayerComponent } from './sequence-player.component';

describe('SequencePlayerComponent', () => {
  let component: SequencePlayerComponent;
  let fixture: ComponentFixture<SequencePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
