import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Device } from 'app/models/device';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss']
})
export class DeleteDeviceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device | any) { }

  ngOnInit() {
  }

}
