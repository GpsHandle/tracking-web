import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceReportCustomTimeComponent } from './device-report-custom-time.component';

describe('DeviceReportCustomTimeComponent', () => {
  let component: DeviceReportCustomTimeComponent;
  let fixture: ComponentFixture<DeviceReportCustomTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceReportCustomTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReportCustomTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
