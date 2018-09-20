import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Driver } from 'app/models/driver';

@Component({
  selector: 'app-add-edit-driver',
  templateUrl: './add-edit-driver.component.html',
  styleUrls: ['./add-edit-driver.component.scss']
})
export class AddEditDriverComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditDriverComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Driver | any) { }

  ngOnInit() {
  }

}
