import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShipmentReportComponent } from './shipment-report.component';

describe('ShipmentReportComponent', () => {
  let component: ShipmentReportComponent;
  let fixture: ComponentFixture<ShipmentReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
