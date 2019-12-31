import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertProfileEditComponent } from './alert-profile-edit.component';

describe('AlertProfileEditComponent', () => {
  let component: AlertProfileEditComponent;
  let fixture: ComponentFixture<AlertProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
