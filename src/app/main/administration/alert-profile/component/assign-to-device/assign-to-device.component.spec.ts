import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToDeviceComponent } from './assign-to-device.component';

describe('AssignToDeviceComponent', () => {
  let component: AssignToDeviceComponent;
  let fixture: ComponentFixture<AssignToDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignToDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
