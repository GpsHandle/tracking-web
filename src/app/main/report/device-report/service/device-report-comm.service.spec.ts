import { TestBed } from '@angular/core/testing';

import { DeviceReportCommService } from './device-report-comm.service';

describe('DeviceReportCommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceReportCommService = TestBed.get(DeviceReportCommService);
    expect(service).toBeTruthy();
  });
});
