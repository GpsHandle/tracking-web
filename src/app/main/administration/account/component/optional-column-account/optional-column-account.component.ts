import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';

@Component({
    selector: 'app-optional-column-account',
    templateUrl: './optional-column-account.component.html',
    styleUrls: ['./optional-column-account.component.scss']
})
export class OptionalColumnAccountComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<OptionalColumnAccountComponent>,
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
