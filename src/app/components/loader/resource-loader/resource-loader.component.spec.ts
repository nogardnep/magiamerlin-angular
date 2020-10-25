import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceLoaderComponent } from './resource-loader.component';

describe('ResourceLoaderComponent', () => {
  let component: ResourceLoaderComponent;
  let fixture: ComponentFixture<ResourceLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
