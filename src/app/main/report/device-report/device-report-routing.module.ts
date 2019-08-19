import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/main/report/device-report/layout/layout.component';
import { DreportComponent } from 'app/main/report/device-report/component/dreport/dreport.component';
import { DashboardComponent } from 'app/main/report/device-report/component/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                pathMatch: 'full'
            },
            {
                path: ':deviceId',
                component: DreportComponent,
                pathMatch: 'full'
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceReportRoutingModule { }
