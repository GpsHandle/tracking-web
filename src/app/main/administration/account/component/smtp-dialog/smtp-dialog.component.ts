import {Component, Inject, OnInit} from '@angular/core';
import {MailProperties} from "../../../../../models/mail-properties";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-smtp-dialog',
  templateUrl: './smtp-dialog.component.html',
  styleUrls: ['./smtp-dialog.component.scss']
})
export class SmtpDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SmtpDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MailProperties | any) { }

  ngOnInit() {
      this.data = {} as MailProperties;
  }

    save() {
        this.dialogRef.close(this.data);
    }

    cancel() {
        this.dialogRef.close();
    }
}
