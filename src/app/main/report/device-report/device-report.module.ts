import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedComponent } from './component/speed/speed.component';
import { ParkingComponent } from './component/parking/parking.component';
import { DeviceReportCustomTimeComponent } from './component/custom-timerange-dialog/device-report-custom-time.component';
import { GeozoneComponent } from './component/geozone/geozone.component';
import { AlertLogsComponent } from './component/alert-logs/alert-logs.component';
import { ReportComponent } from './component/report/report.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {DeviceReportCommService} from "./service/device-report-comm.service";
import {CustomComponentModule} from "../../../cutom-component/custom-component.module";
import {DeviceReportRoutingModule} from "./device-report-routing.module";
import {MaterialShared} from "../../../shared/material-shared";
import {LayoutComponent} from "./layout/layout.component";

@NgModule({
    imports: [
        CommonModule,
        DeviceReportRoutingModule,
        MaterialShared,
        CustomComponentModule
    ],
    declarations: [
        LayoutComponent,
        SpeedComponent,
        ParkingComponent,
        DeviceReportCustomTimeComponent,
        GeozoneComponent,
        AlertLogsComponent,
        ReportComponent,
        DashboardComponent
    ],
    entryComponents: [
        DeviceReportCustomTimeComponent
    ],
    providers: [
        DeviceReportCommService
    ]
})
export class DeviceReportModule { }
