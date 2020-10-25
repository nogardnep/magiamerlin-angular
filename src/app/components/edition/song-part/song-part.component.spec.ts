import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPartComponent } from './song-part.component';

describe('SongPartComponent', () => {
  let component: SongPartComponent;
  let fixture: ComponentFixture<SongPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
