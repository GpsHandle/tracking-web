import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/main/dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'tracking',
                loadChildren: 'app/main/tracking/mapping.module#MappingModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'report',
                loadChildren: 'app/main/report/report.module#ReportModule',
                canActivate: [AuthGuard]
            },
            {
                path: '_admin',
                loadChildren: 'app/main/administration/administration.module#AdministrationModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'usage',
                loadChildren: 'app/main/usage/usage.module#UsageModule',
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
