import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeozoneReportComponent } from './geozone-report.component';

describe('GeozoneReportComponent', () => {
  let component: GeozoneReportComponent;
  let fixture: ComponentFixture<GeozoneReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeozoneReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeozoneReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
