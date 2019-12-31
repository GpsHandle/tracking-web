import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertProfileAddComponent } from './alert-profile-add.component';

describe('AlertProfileAddComponent', () => {
  let component: AlertProfileAddComponent;
  let fixture: ComponentFixture<AlertProfileAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertProfileAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertProfileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
