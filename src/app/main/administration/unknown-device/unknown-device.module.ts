import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownDeviceComponent } from './unknown-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AddNewDeviceComponent} from "./add-new-device/add-new-device.component";
import {DeviceService} from "../../../core/services/device.service";
import {AlertProfileService} from "../../../core/services/alert-profile.service";
import {MaterialShared} from "../../../shared/material-shared";
import {AccountService} from "../../../core/services/account.service";
import {UnknownDeviceRoutingModule} from "./unknown-device-routing.module";

@NgModule({
    declarations: [
        UnknownDeviceComponent,
        AddNewDeviceComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialShared,
        UnknownDeviceRoutingModule
    ],
    providers: [
        AccountService,
        AlertProfileService,
        DeviceService
    ],
    entryComponents: [
        AddNewDeviceComponent
    ]
})
export class UnknownDeviceModule { }
