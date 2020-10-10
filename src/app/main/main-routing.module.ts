import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent} from './main.component';
//-- guards
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'tracking',
                loadChildren: () => import('./tracking/mapping.module').then(m => m.MappingModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'report',
                loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'admin',
                loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'help',
                loadChildren: () => import('./help/help.module').then(m => m.HelpModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'mail',
                loadChildren: () => import('./mail/mail.module').then(m => m.MailModule),
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
