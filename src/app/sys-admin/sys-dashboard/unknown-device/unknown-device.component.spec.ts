import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownDeviceComponent } from './unknown-device.component';

describe('UnknownDeviceComponent', () => {
  let component: UnknownDeviceComponent;
  let fixture: ComponentFixture<UnknownDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
