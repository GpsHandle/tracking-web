import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl } from '@angular/forms';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ApplicationContext} from "../../../../../application-context";
import {AccountRequest} from "../../../../../models/request/account.request";
import {Privilege} from "../../../../../models/privilege";

@Component({
    selector: 'applicationContext-add-edit-account',
    templateUrl: './add-edit-account.component.html',
    styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit, AfterViewInit {
    //privilegeIds: number[];
    privilege: number;
    password: string;
    re_password: string;

    filteredStatus: Observable<string[]>;

    statusControl: FormControl = new FormControl();

    isEditing = false;
    privilegeList: Array<Privilege>;


    constructor(private applicationContext: ApplicationContext,
                public dialogRef: MatDialogRef<AddEditAccountComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

    ngOnInit() {
        this.isEditing = !!this.data.accountId;

        this.statusControl.setValue(this.data.status);
        this.privilegeList = this.applicationContext.getPrivileges();

        this.filteredStatus = this.statusControl.valueChanges
            .pipe(
                startWith(''),
                map(value => {
                    return this.applicationContext.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
                })
            );
    }

    ngAfterViewInit(): void {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        let data1 = new AccountRequest(this.data);
        data1.status = this.statusControl.value;

        data1.password = this.password;
        this.dialogRef.close(data1);
    }
}
