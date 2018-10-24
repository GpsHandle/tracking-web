import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'app/sys-admin/sys-dashboard/dashboard/dashboard.component';
import { SysDashboardComponent } from 'app/sys-admin/sys-dashboard/sys-dashboard.component';
import { EventLoggerComponent } from 'app/sys-admin/sys-dashboard/event-logger/event-logger.component';
import { DevelopmentComponent } from 'app/sys-admin/sys-dashboard/development/development.component';

const routes: Routes = [
    { path: '', component: SysDashboardComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
            { path: 'development', component: DevelopmentComponent, pathMatch: 'full' },
            { path: 'event-logs', component: EventLoggerComponent, pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SysDashboardRoutingModule { }
