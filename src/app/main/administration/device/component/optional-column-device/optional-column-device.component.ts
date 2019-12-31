import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-optional-column-device',
  templateUrl: './optional-column-device.component.html',
  styleUrls: ['./optional-column-device.component.scss']
})
export class OptionalColumnDeviceComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<OptionalColumnDeviceComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }
    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}
