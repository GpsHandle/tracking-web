import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlertProfileComponent } from './delete-alert-profile.component';

describe('DeleteAlertProfileComponent', () => {
  let component: DeleteAlertProfileComponent;
  let fixture: ComponentFixture<DeleteAlertProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAlertProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAlertProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
