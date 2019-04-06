import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownDeviceComponent } from './unknown-device.component';
import { UnknownDeviceRoutingModule } from 'app/main/administration/unknown-device/unknown-device-routing.module';
import { MaterialShared } from 'app/shared/material-shared';

@NgModule({
    declarations: [UnknownDeviceComponent],
    imports: [
        CommonModule,
        MaterialShared,
        UnknownDeviceRoutingModule
    ]
})
export class UnknownDeviceModule { }
