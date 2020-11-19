import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountReportComponent } from './account-report.component';

describe('AccountReportComponent', () => {
  let component: AccountReportComponent;
  let fixture: ComponentFixture<AccountReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
