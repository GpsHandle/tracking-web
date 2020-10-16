import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAddComponent } from './driver-add.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";
import {DriverService} from "../../../../../core/services/driver.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialShared} from "../../../../../shared/material-shared";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DriverAddComponent', () => {
  let component: DriverAddComponent;
  let fixture: ComponentFixture<DriverAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverAddComponent ],
      imports: [
        MaterialShared,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        DriverService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
