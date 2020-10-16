import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialShared} from "../../../../../shared/material-shared";

describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent;
  let fixture: ComponentFixture<ChangePasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordDialogComponent ],
      imports: [
          MaterialShared,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
