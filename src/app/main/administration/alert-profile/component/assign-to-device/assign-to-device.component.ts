import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Device} from "../../../../../models/device";
import {AlertProfile} from "../../../../../models/alert-profile";

@Component({
  selector: 'app-assign-to-device',
  templateUrl: './assign-to-device.component.html',
  styleUrls: ['./assign-to-device.component.scss']
})
export class AssignToDeviceComponent implements OnInit {

  devices: Device[];
  alert: AlertProfile;

  constructor(public dialogRef: MatDialogRef<AssignToDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.devices = this.data.devices;
    this.alert = this.data.alert;
  }

  onSave() {

  }
}
