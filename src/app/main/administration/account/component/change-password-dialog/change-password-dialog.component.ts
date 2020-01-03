import {Component, Inject, OnInit} from '@angular/core';
import {ApplicationContext} from "../../../../../application-context";
import {Account} from "../../../../../models/account";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
    password: string;
    re_password: string;
  constructor(private applicationContext: ApplicationContext,
              public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

  ngOnInit() {
  }

    onSave() {

    }

    cancel(): void {
        this.dialogRef.close();
    }
}
