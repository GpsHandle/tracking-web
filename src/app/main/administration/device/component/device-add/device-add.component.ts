import { Component, OnInit } from '@angular/core';
import {Device} from "../../../../../models/device";
import {Account} from "../../../../../models/account";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {AlertProfile} from "../../../../../models/alert-profile";
import {AccountService} from "../../../../../services/account.service";
import {AlertProfileService} from "../../../../../services/alert-profile.service";
import {DeviceService} from "../../../../../services/device.service";
import {map, startWith} from "rxjs/operators";
import {DeviceRequest} from "../../../../../models/request/device.request";
import {ApplicationContext} from "../../../../../application-context";

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.scss']
})
export class DeviceAddComponent implements OnInit {
    data: Device;
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
              private deviceService: DeviceService, private applicationContext: ApplicationContext) { }

  ngOnInit() {
      this.data = {} as Device;
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
          () => {}
      );
  }

    save() {
        const deviceR = new DeviceRequest(this.data);
        deviceR.status = this.statusControl.value;
        deviceR.accountIds = this.accountIds;
        deviceR.alertProfileIds = this.alertIds;
        this.deviceService.create(deviceR).subscribe(
            data => {
                this.applicationContext.navigate(['main/admin/device']);
            }
        );
    }
}
