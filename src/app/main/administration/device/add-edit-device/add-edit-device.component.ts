import * as _ from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Company } from 'app/models/company';
import { Account } from 'app/models/account';
import { CompanyService } from 'app/services/company.service';
import { AccountLittle } from 'app/models/little/account.little';
import { AccountService } from 'app/services/account.service';
import { DeviceRequest } from 'app/models/request/device.request';
import { DeviceService } from 'app/services/device.service';
import { Device } from 'app/models/device';
import { AlertProfile } from 'app/models/alert-profile';
import { AlertProfileService } from 'app/services/alert-profile.service';
import { AlertProfileLittle } from 'app/models/little/alert-profile.little';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.scss']
})
export class AddEditDeviceComponent implements OnInit {

    filteredCompanies: Observable<Company[]>;
    companyControl: FormControl = new FormControl();
    companyList: Company[];

    statusList: string[];
    filteredStatus: Observable<string[]>;
    statusControl: FormControl = new FormControl();

    dateExpired: Date;

    accountList: Observable<Account[]>;
    alertProfileList: Observable<AlertProfile[]>;

    accountIds: number[];
    alertIds: number[];

    constructor(private companyService: CompanyService,
                private accountService: AccountService,
                private alertProfileService: AlertProfileService,
                private deviceService: DeviceService,
                public dialogRef: MatDialogRef<AddEditDeviceComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Device | any) { }

    ngOnInit() {
        this.accountIds = _.map(this.data.accounts, (acc: AccountLittle) => {
            return acc.id;
        });

        this.alertIds = _.map(this.data.alertProfiles, (alert: AlertProfileLittle) => alert.id);

        this.companyControl.setValue(this.data.company);
        this.statusControl.setValue(this.data.status);

        this.accountList = this.accountService.getAll();
        this.alertProfileList = this.alertProfileService.getAll();

        this.companyService.getAll().subscribe(
            response => {
                this.companyList = response;
            },
            error => {},
            () => {
                this.filteredCompanies = this.companyControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this.filter(value))
                    );
            }
        );

        this.deviceService.getAllStatus().subscribe(
            response => {
                this.statusList = response;
            },
            error => {},
            () => {
                this.filteredStatus = this.statusControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => {
                            return this.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
                        })
                    );
            }
        );

        this.dateExpired = this.data.expiredOn ? new Date(this.data.expiredOn) : null;
    }

    filter(value: string): Company[] {
        if(_.isString(value)) {
            return this.companyList.filter(co => co.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
        } else {
            return this.companyList;
        }
    }


    displayFn(company: Company): string | Company {
        return company ? company.name : company;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.data.expiredOn = this.dateExpired;
        let data1 = new DeviceRequest(this.data);
        data1.companyId = this.companyControl.value.id;
        data1.status = this.statusControl.value;
        data1.accountIds = this.accountIds;
        data1.alertProfileIds = this.alertIds;
        this.dialogRef.close(data1);
    }

}
