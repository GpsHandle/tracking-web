import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Driver } from 'app/models/driver';
import { merge, of, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApplicationContext } from 'app/application-context';

@Component({
    selector: 'app-add-edit-driver',
    templateUrl: './add-edit-driver.component.html',
    styleUrls: ['./add-edit-driver.component.scss']
})
export class AddEditDriverComponent implements OnInit {

    constructor(private applicationContext: ApplicationContext,
        public matDialog: MatDialog,
        public dialogRef: MatDialogRef<AddEditDriverComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Driver | any) { }

    ngOnInit() {
    }
}
