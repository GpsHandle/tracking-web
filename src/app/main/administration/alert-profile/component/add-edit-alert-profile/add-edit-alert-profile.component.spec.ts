import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAlertProfileComponent } from './add-edit-alert-profile.component';

describe('AddEditAlertProfileComponent', () => {
  let component: AddEditAlertProfileComponent;
  let fixture: ComponentFixture<AddEditAlertProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAlertProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAlertProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
