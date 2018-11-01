import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountReportComponent } from 'app/main/report/account-report/account-report.component';
import { AlertHistoryComponent } from 'app/main/report/alert-history/alert-history.component';
import { DriverReportComponent } from 'app/main/report/driver-report/driver-report.component';
import { ShipmentReportComponent } from 'app/main/report/shipment-report/shipment-report.component';
import { AuthGuard } from 'app/guards/auth.guard';

const routes: Routes = [
    // {
    //     path: '',
    //     component: DashboardComponent,
    //     pathMatch: 'full'
    // },
    {
        path: '',
        redirectTo: 'device',
        pathMatch: 'full'
    },
    {
        path: 'device',
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
