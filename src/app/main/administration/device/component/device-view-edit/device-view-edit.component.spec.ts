import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceViewEditComponent } from './device-view-edit.component';

describe('DeviceViewEditComponent', () => {
  let component: DeviceViewEditComponent;
  let fixture: ComponentFixture<DeviceViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
