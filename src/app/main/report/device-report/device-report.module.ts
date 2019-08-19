import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceReportRoutingModule } from 'app/main/report/device-report/device-report-routing.module';
import { LayoutComponent } from 'app/main/report/device-report/layout/layout.component';
import { MaterialShared } from 'app/shared/material-shared';
import { DSpeedComponent } from './component/dspeed/d-speed.component';
import { DParkingComponent } from './component/dparking/d-parking.component';
import { DeviceReportCustomTimeComponent } from './component/custom-timerange-dialog/device-report-custom-time.component';
import { CustomComponentModule } from 'app/cutom-component/custom-component.module';
import { GeozoneReportComponent } from './component/geozone-report/geozone-report.component';
import { AlertHistoryComponent } from './component/alert-history/alert-history.component';
import { DreportComponent } from './component/dreport/dreport.component';
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
        DSpeedComponent,
        DParkingComponent,
        DeviceReportCustomTimeComponent,
        GeozoneReportComponent,
        AlertHistoryComponent,
        DreportComponent,
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
