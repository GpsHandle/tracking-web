import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from 'app/main/report/report-routing.module';
import { MaterialShared } from 'app/shared/material-shared';
import { DeviceService } from 'app/services/device.service';
import { AccountReportComponent } from 'app/main/report/account-report/account-report.component';
import { DriverReportComponent } from 'app/main/report/driver-report/driver-report.component';
import { ShipmentReportComponent } from 'app/main/report/shipment-report/shipment-report.component';
import { AlertHistoryComponent } from 'app/main/report/alert-history/alert-history.component';
import { EventService } from 'app/services/event.service';

@NgModule({
    imports: [
        CommonModule,
        ReportRoutingModule,
        MaterialShared
    ],
    providers: [
        DeviceService,
        EventService
    ],
    declarations: [
        AccountReportComponent,
        DriverReportComponent,
        ShipmentReportComponent,
        AlertHistoryComponent,
    ]
})
export class ReportModule { }
