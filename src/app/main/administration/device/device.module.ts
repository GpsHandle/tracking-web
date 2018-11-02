import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from 'app/main/administration/device/device.component';
import { AddEditDeviceComponent } from 'app/main/administration/device/add-edit-device/add-edit-device.component';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/optional-column-device/optional-column-device.component';
import { DeviceService } from 'app/services/device.service';
import { DeviceRoutingModule } from 'app/main/administration/device/device-routing.module';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';
import { MaterialShared } from 'app/shared/material-shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { CompanyService } from 'app/services/company.service';
import { AccountService } from 'app/services/account.service';
import { DeleteDeviceComponent } from './delete-device/delete-device.component';

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
        DeviceService,
        CompanyService
    ],
    declarations: [
        DeviceComponent,
        AddEditDeviceComponent,
        OptionalColumnDeviceComponent,
        DeleteDeviceComponent,
    ],
    entryComponents: [
        AddEditDeviceComponent,
        OptionalColumnDeviceComponent,
    ]
})
export class DeviceModule { }
