import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Account } from 'app/models/account';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteAccountComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

  ngOnInit() {
  }

}
