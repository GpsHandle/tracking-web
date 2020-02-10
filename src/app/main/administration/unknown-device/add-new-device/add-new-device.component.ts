import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { UnknownDevice } from 'app/models/unknown-device';
import { AccountService } from 'app/services/account.service';
import { AlertProfileService } from 'app/services/alert-profile.service';
import { DeviceService } from 'app/services/device.service';
import { Account } from 'app/models/account';
import { AlertProfile } from 'app/models/alert-profile';
import { DeviceRequest } from 'app/models/request/device.request';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent implements OnInit {

    statusList: string[];
    filteredStatus: Observable<string[]>;
    statusControl: FormControl = new FormControl();

    dateExpired: Date;

    accountList: Observable<Account[]>;
    alertProfileList: Observable<AlertProfile[]>;

    accountIds: number[];
    alertIds: number[];

  constructor(private accountService: AccountService,
              private alertProfileService: AlertProfileService,
              private deviceService: DeviceService,
              public dialogRef: MatDialogRef<AddNewDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UnknownDevice | any) { }

    ngOnInit() {
        // this.accountIds = _.map(this.data.accounts, (acc: AccountLittle) => {
        //     return acc.id;
        // });
        //
        // this.alertIds = _.map(this.data.alertProfiles, (alert: AlertProfileLittle) => alert.id);
        //
        // this.companyControl.setValue(this.data.company);
        // this.statusControl.setValue(this.data.status);
        //
        // this.accountList = this.accountService.getAll();
        // this.alertProfileList = this.alertProfileService.getAll();
        //
        // this.companyService.getAll().subscribe(
        //     response => {
        //         this.companyList = response;
        //     },
        //     error => {},
        //     () => {
        //         this.filteredCompanies = this.companyControl.valueChanges
        //             .pipe(
        //                 startWith(''),
        //                 map(value => this.filter(value))
        //             );
        //     }
        // );
        //
        // this.deviceService.getAllStatus().subscribe(
        //     response => {
        //         this.statusList = response;
        //     },
        //     error => {},
        //     () => {
        //         this.filteredStatus = this.statusControl.valueChanges
        //             .pipe(
        //                 startWith(''),
        //                 map(value => {
        //                     return this.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
        //                 })
        //             );
        //     }
        // );
        //
        // this.dateExpired = this.data.expiredOn ? new Date(this.data.expiredOn) : null;
    }


    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.data.expiredOn = this.dateExpired;
        const data1 = new DeviceRequest(this.data);
        data1.status = this.statusControl.value;
        data1.accountIds = this.accountIds;
        data1.alertProfileIds = this.alertIds;
        this.dialogRef.close(data1);
    }
}
