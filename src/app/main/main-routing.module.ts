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
                path: 'tracking',
                loadChildren: () => import('app/main/tracking/mapping.module').then(m => m.MappingModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'report',
                loadChildren: () => import('app/main/report/report.module').then(m => m.ReportModule),
                canActivate: [AuthGuard]
            },
            {
                path: '_admin',
                loadChildren: () => import('app/main/administration/administration.module').then(m => m.AdministrationModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'help',
                loadChildren: () => import('app/main/help/help.module').then(m => m.HelpModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'mail',
                loadChildren: () => import('app/main/mail/mail.module').then(m => m.MailModule),
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
