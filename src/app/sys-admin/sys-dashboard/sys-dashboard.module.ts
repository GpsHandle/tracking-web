import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysDashboardRoutingModule } from 'app/sys-admin/sys-dashboard/sys-dashboard-routing.module';
import { MaterialShared } from 'app/sys-admin/material-shared';
import { SysDashboardComponent } from './sys-dashboard.component';
import { DashboardComponent } from 'app/sys-admin/sys-dashboard/dashboard/dashboard.component';
import { DevelopmentComponent } from 'app/sys-admin/sys-dashboard/development/development.component';
import { EventLoggerComponent } from 'app/sys-admin/sys-dashboard/event-logger/event-logger.component';
import { UnknownDeviceComponent } from './unknown-device/unknown-device.component';
import { AddNewDeviceComponent } from './add-new-device/add-new-device.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        SysDashboardRoutingModule
    ],
    declarations: [
        DashboardComponent,
        SysDashboardComponent,
        DevelopmentComponent,
        EventLoggerComponent,
        UnknownDeviceComponent,
        AddNewDeviceComponent
    ],
    entryComponents: [
        AddNewDeviceComponent
    ]
})
export class SysDashboardModule { }
