import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertHistoryComponent} from "./alert-history/alert-history.component";
import {DeviceService} from "../../core/services/device.service";
import {ReportRoutingModule} from "./report-routing.module";
import {EventService} from "../../core/services/event.service";
import {AccountReportComponent} from "./account-report/account-report.component";
import {MaterialShared} from "../../shared/material-shared";
import {ShipmentReportComponent} from "./shipment-report/shipment-report.component";
import {DriverReportComponent} from "./driver-report/driver-report.component";

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
