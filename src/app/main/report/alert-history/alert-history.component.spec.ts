import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertHistoryComponent } from './alert-history.component';

describe('AlertLogsComponent', () => {
  let component: AlertHistoryComponent;
  let fixture: ComponentFixture<AlertHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
