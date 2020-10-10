import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {ReportComponent} from "./component/report/report.component";
import {LayoutComponent} from "./layout/layout.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";

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
                component: ReportComponent,
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
