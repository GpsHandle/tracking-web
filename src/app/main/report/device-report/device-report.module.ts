import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceReportRoutingModule } from 'app/main/report/device-report/device-report-routing.module';
import { LayoutComponent } from 'app/main/report/device-report/layout/layout.component';
import { MaterialShared } from 'app/shared/material-shared';
import { SpeedComponent } from './component/speed/speed.component';
import { ParkingComponent } from './component/parking/parking.component';
import { DeviceReportCustomTimeComponent } from './component/custom-timerange-dialog/device-report-custom-time.component';
import { CustomComponentModule } from 'app/cutom-component/custom-component.module';
import { GeozoneComponent } from './component/geozone/geozone.component';
import { AlertHistoryComponent } from './component/alert-history/alert-history.component';
import { ReportComponent } from './component/report/report.component';
import { DeviceReportCommService } from 'app/main/report/device-report/service/device-report-comm.service';
import { DashboardComponent } from './component/dashboard/dashboard.component';

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
        AlertHistoryComponent,
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
