import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceReportComponent} from "./device-report/device-report.component";
import { AccountReportComponent } from 'app/main/report/account-report/account-report.component';
import { AlertHistoryComponent } from 'app/main/report/alert-history/alert-history.component';
import { DriverReportComponent } from 'app/main/report/driver-report/driver-report.component';
import { ShipmentReportComponent } from 'app/main/report/shipment-report/shipment-report.component';
import { AuthGuard } from 'app/shared/services/auth.guard';
import { DeviceReportModule } from 'app/main/report/device-report/device-report.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/main/report/device-report/device-report.module#DeviceReportModule',
        canActivate: [AuthGuard],
    },
    { path: 'account', component: AccountReportComponent },
    { path: 'alert', component: AlertHistoryComponent },
    { path: 'driver', component: DriverReportComponent },
    { path: 'shipment', component: ShipmentReportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
