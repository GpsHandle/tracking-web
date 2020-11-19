import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventLineChartComponent } from './event-line-chart.component';

describe('EventLineChartComponent', () => {
  let component: EventLineChartComponent;
  let fixture: ComponentFixture<EventLineChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
