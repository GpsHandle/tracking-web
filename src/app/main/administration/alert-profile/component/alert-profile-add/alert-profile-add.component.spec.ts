import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertProfileAddComponent } from './alert-profile-add.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";
import {GeozoneService} from "../../../../../core/services/geozone.service";
import {MaterialShared} from "../../../../../shared/material-shared";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AlertProfileAddComponent', () => {
  let component: AlertProfileAddComponent;
  let fixture: ComponentFixture<AlertProfileAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialShared,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ AlertProfileAddComponent ],
      providers: [GeozoneService]
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
