import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlertHistoryComponent} from "./alert-history/alert-history.component";
import {AccountReportComponent} from "./account-report/account-report.component";
import {ShipmentReportComponent} from "./shipment-report/shipment-report.component";
import {AuthGuard} from "../../core/guards/auth.guard";
import {DriverReportComponent} from "./driver-report/driver-report.component";

const routes: Routes = [
    // {
    //     path: '',
    //     component: ReportComponent,
    //     pathMatch: 'full'
    // },
    {
        path: '',
        redirectTo: 'device',
        pathMatch: 'full'
    },
    {
        path: 'device',
        loadChildren: () => import('./device-report/device-report.module').then(m => m.DeviceReportModule),
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
