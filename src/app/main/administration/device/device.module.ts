import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from 'app/main/administration/device/component/device-list/device.component';
import { AddEditDeviceComponent } from 'app/main/administration/device/component/add-edit-device/add-edit-device.component';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/component/optional-column-device/optional-column-device.component';
import { DeviceService } from 'app/services/device.service';
import { DeviceRoutingModule } from 'app/main/administration/device/device-routing.module';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';
import { MaterialShared } from 'app/shared/material-shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { AccountService } from 'app/services/account.service';
import { DeleteDeviceComponent } from './component/delete-device/delete-device.component';
import { DeviceAddComponent } from './component/device-add/device-add.component';
import { DeviceViewEditComponent } from './component/device-view-edit/device-view-edit.component';

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
