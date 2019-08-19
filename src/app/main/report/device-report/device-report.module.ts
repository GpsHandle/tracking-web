import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceReportRoutingModule } from 'app/main/report/device-report/device-report-routing.module';
import { DeviceReportLayoutComponent } from 'app/main/report/device-report/layout/device-report-layout.component';
import { MaterialShared } from 'app/shared/material-shared';
import { DSpeedComponent } from './component/d-speed/d-speed.component';
import { DParkingComponent } from './component/d-parking/d-parking.component';
import { DeviceReportCustomTimeComponent } from './component/device-report-custom-time/device-report-custom-time.component';
import { CustomComponentModule } from 'app/cutom-component/custom-component.module';
import { GeozoneReportComponent } from './component/geozone-report/geozone-report.component';
import { AlertHistoryComponent } from './component/alert-history/alert-history.component';

@NgModule({
    imports: [
        CommonModule,
        DeviceReportRoutingModule,
        MaterialShared,
        CustomComponentModule
    ],
    declarations: [
        DeviceReportLayoutComponent,
        DSpeedComponent,
        DParkingComponent,
        DeviceReportCustomTimeComponent,
        GeozoneReportComponent,
        AlertHistoryComponent
    ],
    entryComponents: [
        DeviceReportCustomTimeComponent
    ]
})
export class DeviceReportModule { }
