import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverViewEditComponent } from './driver-view-edit.component';

describe('DriverViewEditComponent', () => {
  let component: DriverViewEditComponent;
  let fixture: ComponentFixture<DriverViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
