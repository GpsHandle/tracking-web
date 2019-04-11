import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownDeviceComponent } from './unknown-device.component';
import { UnknownDeviceRoutingModule } from 'app/main/administration/unknown-device/unknown-device-routing.module';
import { MaterialShared } from 'app/shared/material-shared';
import { AddNewDeviceComponent } from 'app/main/administration/unknown-device/add-new-device/add-new-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    entryComponents: [
        AddNewDeviceComponent
    ]
})
export class UnknownDeviceModule { }
