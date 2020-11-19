import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeozoneComponent } from './geozone.component';

describe('GeozoneComponent', () => {
  let component: GeozoneComponent;
  let fixture: ComponentFixture<GeozoneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeozoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeozoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
