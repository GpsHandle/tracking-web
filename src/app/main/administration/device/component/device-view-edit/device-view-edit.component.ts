import { Component, OnInit } from '@angular/core';
import {Device} from "../../../../../models/device";
import {map, startWith, switchMap} from "rxjs/operators";
import {ApplicationContext} from "../../../../../application-context";
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../../../../../services/device.service";
import {Observable} from "rxjs";
import {Account} from "../../../../../models/account";
import {AlertProfile} from "../../../../../models/alert-profile";
import {AccountService} from "../../../../../services/account.service";
import {AlertProfileService} from "../../../../../services/alert-profile.service";
import {FormControl} from "@angular/forms";
import * as _ from "lodash";
import {AccountLittle} from "../../../../../models/little/account.little";
import {AlertProfileLittle} from "../../../../../models/little/alert-profile.little";
import {DeviceRequest} from "../../../../../models/request/device.request";

@Component({
    selector: 'app-device-view-edit',
    templateUrl: './device-view-edit.component.html',
    styleUrls: ['./device-view-edit.component.scss']
})
export class DeviceViewEditComponent implements OnInit {
    isEditing: boolean;
    data: Device;
    deviceId: number;
    accountIds: number[];
    alertIds: number[];
    dateExpired: Date;
    statusList: string[];
    filteredStatus: Observable<string[]>;

    statusControl: FormControl = new FormControl();
    accountList: Observable<Account[]>;
    alertProfileList: Observable<AlertProfile[]>;
    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute, private deviceService: DeviceService,
                private accountService: AccountService,
                private alertProfileService: AlertProfileService) { }

    ngOnInit() {
        this.data = {} as Device;
        this.statusControl.disable()
        this.route.params.pipe(
            switchMap(params => {
                this.deviceId = params['id'];
                return this.deviceService.getById(this.deviceId)
            })
        ).subscribe(data => {
            this.data = data;
            this.statusControl.setValue(this.data.status);
            this.accountIds = _.map(this.data.accounts, (acc: AccountLittle) => {
                return acc.id;
            });

            this.alertIds = _.map(this.data.alertProfiles, (alert: AlertProfileLittle) => alert.id);
            this.dateExpired = this.data.expiredOn ? new Date(this.data.expiredOn) : null;
        });

        this.accountList = this.accountService.getAll();
        this.alertProfileList = this.alertProfileService.getAll();
        this.deviceService.getAllStatus().subscribe(
            response => {
                this.statusList = response;
                this.filteredStatus = this.statusControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => {
                            return this.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
                        })
                    );
            },
            error => {},
            () => {

            }
        );
    }

    save() {
        this.data.expiredOn = this.dateExpired;
        let data1 = new DeviceRequest(this.data);
        data1.status = this.statusControl.value;
        data1.accountIds = this.accountIds;
        data1.alertProfileIds = this.alertIds
        this.deviceService.update(this.deviceId, data1).subscribe(
            data => {
                this.applicationContext.info('Device updated successfully!');
                this.applicationContext.navigate(['/main/admin/device']);
            }
        )
    }

    edit() {
        this.isEditing = true;
        this.statusControl.enable()
    }

    cancel() {

    }
}
