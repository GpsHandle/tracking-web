import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLogsComponent } from './alert-logs.component';

describe('AlertLogsComponent', () => {
  let component: AlertLogsComponent;
  let fixture: ComponentFixture<AlertLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
