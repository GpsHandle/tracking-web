import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysAdminRoutingModule } from 'app/sys-admin/sys-admin-routing.module';
import { LoginComponent } from 'app/sys-admin/login/login.component';
import { MaterialShared } from 'app/shared/material-shared';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule,
        SysAdminRoutingModule,
        FormsModule,
        MaterialShared
    ],
    declarations: [
        LoginComponent,
        LogoutComponent
    ],
    entryComponents: [

    ]
})
export class SysAdminModule { }
