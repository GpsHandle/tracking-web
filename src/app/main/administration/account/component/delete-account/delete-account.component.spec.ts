import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountComponent } from './delete-account.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MaterialShared} from "../../../../../shared/material-shared";

describe('DeleteAccountComponent', () => {
  let component: DeleteAccountComponent;
  let fixture: ComponentFixture<DeleteAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccountComponent ],
      imports: [
          MaterialShared
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        {
          provide: MatDialogRef,
          useValue: {}
        },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
