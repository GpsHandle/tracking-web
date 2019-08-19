import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReportCustomTimeComponent } from './device-report-custom-time.component';

describe('DeviceReportCustomTimeComponent', () => {
  let component: DeviceReportCustomTimeComponent;
  let fixture: ComponentFixture<DeviceReportCustomTimeComponent>;

  beforeEach(async(() => {
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
