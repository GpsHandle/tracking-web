import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DeviceReportLayoutComponent } from 'app/main/report/device-report/layout/device-report-layout.component';

const routes: Routes = [
    {
        path: '',
        component: DeviceReportLayoutComponent,
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
        component: DeviceReportLayoutComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceReportRoutingModule { }
