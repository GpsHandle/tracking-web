import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDeviceComponent } from './component/delete-device/delete-device.component';
import { DeviceAddComponent } from './component/device-add/device-add.component';
import { DeviceViewEditComponent } from './component/device-view-edit/device-view-edit.component';
import {CustomPipeModule} from "../../../pipes/custom-pipe.module";
import {DeviceRoutingModule} from "./device-routing.module";
import {DeviceComponent} from "./component/device-list/device.component";
import {AddEditDeviceComponent} from "./component/add-edit-device/add-edit-device.component";
import {OptionalColumnDeviceComponent} from "./component/optional-column-device/optional-column-device.component";
import {CustomDirectivesModule} from "../../../core/directives/custom-directives.module";
import {DeviceService} from "../../../services/device.service";
import {MaterialShared} from "../../../shared/material-shared";
import {AccountService} from "../../../services/account.service";

@NgModule({
    imports: [
        CommonModule,
        CustomPipeModule,
        MaterialShared,
        FormsModule,
        CustomDirectivesModule,
        ReactiveFormsModule,
        DeviceRoutingModule
    ],
    providers: [
        AccountService,
        DeviceService
    ],
    declarations: [
        DeviceComponent,
        AddEditDeviceComponent,
        OptionalColumnDeviceComponent,
        DeleteDeviceComponent,
        DeviceAddComponent,
        DeviceViewEditComponent,
    ],
    entryComponents: [
        AddEditDeviceComponent,
        DeleteDeviceComponent,
        OptionalColumnDeviceComponent,
    ]
})
export class DeviceModule { }
