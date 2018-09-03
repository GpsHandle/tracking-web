import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopmentComponent } from 'app/sys-admin/development/development.component';
import { EventLoggerComponent } from 'app/sys-admin/event-logger/event-logger.component';
import { LoginComponent } from 'app/sys-admin/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'development',
        component: DevelopmentComponent,
        //canActivate: [AuthGuard],
        //canLoad: [SysAdminGuard]
    },
    { path: 'event-logger', component: EventLoggerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SysAdminRoutingModule { }
