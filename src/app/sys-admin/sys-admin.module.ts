import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysAdminRoutingModule } from 'app/sys-admin/sys-admin-routing.module';
import { DevelopmentComponent } from 'app/sys-admin/development/development.component';
import { EventLoggerComponent } from 'app/sys-admin/event-logger/event-logger.component';
import { LoginComponent } from 'app/sys-admin/login/login.component';
import { MaterialShared } from 'app/shared/material-shared';
import { MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SysAdminRoutingModule,
        FormsModule,
        MaterialShared
    ],
    declarations: [
        DevelopmentComponent,
        EventLoggerComponent,
        LoginComponent
    ]
})
export class SysAdminModule { }
