import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DriverViewEditComponent } from './driver-view-edit.component';
import {RouterTestingModule} from "@angular/router/testing";
import {DriverService} from "../../../../../core/services/driver.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialShared} from "../../../../../shared/material-shared";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DriverViewEditComponent', () => {
  let component: DriverViewEditComponent;
  let fixture: ComponentFixture<DriverViewEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverViewEditComponent ],
      imports: [
        MaterialShared,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
          DriverService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
