import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent} from './main.component';
import { ProfileComponent } from 'app/main/profile/profile.component';
//-- guards
import { AuthGuard} from 'app/guards/auth.guard';
import { SysAdminGuard } from 'app/guards/sys-admin.guard';

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
                canActivate: [AuthGuard],
            },
            {
                path: 'help',
                loadChildren: 'app/main/help/help.module#HelpModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'mail',
                loadChildren: 'app/main/mail/mail.module#MailModule',
                canActivate: [AuthGuard],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
