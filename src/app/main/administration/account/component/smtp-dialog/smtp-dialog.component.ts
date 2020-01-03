import {Component, Inject, OnInit} from '@angular/core';
import {SmtpProperties} from "../../../../../models/smtp-properties";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Account} from "../../../../../models/account";

@Component({
  selector: 'app-new-smtp-dialog',
  templateUrl: './smtp-dialog.component.html',
  styleUrls: ['./smtp-dialog.component.scss']
})
export class SmtpDialogComponent implements OnInit {
    aNewSmtpServer: SmtpProperties;

  constructor(public dialogRef: MatDialogRef<SmtpDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

  ngOnInit() {
      this.aNewSmtpServer = {} as SmtpProperties;
  }

    save() {

    }

    cancel() {
        this.dialogRef.close();
    }
}
