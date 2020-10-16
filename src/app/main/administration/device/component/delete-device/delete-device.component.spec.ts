import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeviceComponent } from './delete-device.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import {GeozoneService} from "../../../../../core/services/geozone.service";
import {MaterialShared} from "../../../../../shared/material-shared";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DeleteDeviceComponent', () => {
  let component: DeleteDeviceComponent;
  let fixture: ComponentFixture<DeleteDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDeviceComponent ],
      imports: [
        MaterialShared,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {}
        },

        GeozoneService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
