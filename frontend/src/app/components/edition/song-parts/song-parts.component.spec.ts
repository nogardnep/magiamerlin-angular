import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPartsComponent } from './song-parts.component';

describe('SongPartsComponent', () => {
  let component: SongPartsComponent;
  let fixture: ComponentFixture<SongPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
