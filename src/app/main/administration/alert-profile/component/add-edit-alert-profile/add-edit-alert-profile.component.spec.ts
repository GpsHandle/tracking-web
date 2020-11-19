import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEditAlertProfileComponent } from './add-edit-alert-profile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import {GeozoneService} from "../../../../../core/services/geozone.service";
import {SharedModule} from "../../../../../shared/shared.module";
import {MaterialShared} from "../../../../../shared/material-shared";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AddEditAlertProfileComponent', () => {
  let component: AddEditAlertProfileComponent;
  let fixture: ComponentFixture<AddEditAlertProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAlertProfileComponent ],
      imports: [
        MaterialShared,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
          GeozoneService,
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
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
