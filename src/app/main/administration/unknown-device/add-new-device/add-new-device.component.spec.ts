import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDeviceComponent } from './add-new-device.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AccountService} from "../../../../core/services/account.service";
import {RouterTestingModule} from "@angular/router/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialShared} from "../../../../shared/material-shared";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AddNewDeviceComponent', () => {
  let component: AddNewDeviceComponent;
  let fixture: ComponentFixture<AddNewDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDeviceComponent ],
      imports: [
        MaterialShared,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
          AccountService, { provide: MAT_DIALOG_DATA, useValue: {}}, { provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
