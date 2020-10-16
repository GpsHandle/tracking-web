import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailComponent } from './mail.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialShared} from "../../shared/material-shared";

describe('MailComponent', () => {
  let component: MailComponent;
  let fixture: ComponentFixture<MailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialShared,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ MailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
