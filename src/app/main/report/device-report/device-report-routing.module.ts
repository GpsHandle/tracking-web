import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DeviceReportComponent } from 'app/main/report/device-report/device-report.component';

const routes: Routes = [
    {
        path: '',
        component: DeviceReportComponent,
        children: [
            // {
            //     path: 'dashboard',
            //     loadChildren: 'app/main/dashboard/dashboard.module#DashboardModule',
            //     canActivate: [AuthGuard]
            // },
        ]
    },
    {
        path: ':deviceId',
        component: DeviceReportComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceReportRoutingModule { }
