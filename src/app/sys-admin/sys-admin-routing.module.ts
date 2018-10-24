import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/sys-admin/login/login.component';
import { LogoutComponent } from 'app/sys-admin/logout/logout.component';
import { SysAdminGuard } from 'app/guards/sys-admin.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    {
        path: 'sys',
        loadChildren: 'app/sys-admin/sys-dashboard/sys-dashboard.module#SysDashboardModule',
        canLoad: [SysAdminGuard],
        canActivate: [SysAdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SysAdminRoutingModule { }
