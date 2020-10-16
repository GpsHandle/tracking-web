import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceViewEditComponent } from './device-view-edit.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";
import {DeviceService} from "../../../../../core/services/device.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MaterialShared} from "../../../../../shared/material-shared";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DeviceViewEditComponent', () => {
  let component: DeviceViewEditComponent;
  let fixture: ComponentFixture<DeviceViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewEditComponent ],
      imports: [
          MaterialShared,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          ReactiveFormsModule,
          FormsModule
      ],
      providers: [
          DeviceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
