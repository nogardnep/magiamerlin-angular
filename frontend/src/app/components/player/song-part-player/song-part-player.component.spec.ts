import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPartPlayerComponent } from './song-part-player.component';

describe('SongPartPlayerComponent', () => {
  let component: SongPartPlayerComponent;
  let fixture: ComponentFixture<SongPartPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPartPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPartPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
