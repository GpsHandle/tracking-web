import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from 'app/main/administration/account/account-routing.module';
import { AccountComponent } from 'app/main/administration/account/component/account-list/account.component';
import { AddEditAccountComponent } from 'app/main/administration/account/component/add-edit-account/add-edit-account.component';
import { OptionalColumnAccountComponent } from 'app/main/administration/account/component/optional-column-account/optional-column-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialShared } from 'app/shared/material-shared';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { DeleteAccountComponent } from './component/delete-account/delete-account.component';
import { AccountService } from 'app/services/account.service';
import { EditAccountComponent } from './component/account-edit/edit-account.component';
import { AddAccountComponent } from './component/account-add/add-account.component';
import { ChangePasswordDialogComponent } from './component/change-password-dialog/change-password-dialog.component';
import { SmtpDialogComponent } from './component/smtp-dialog/smtp-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        CustomPipeModule,
        CustomDirectivesModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialShared,
        AccountRoutingModule,
    ],
    declarations: [
        AccountComponent,
        AddEditAccountComponent,
        OptionalColumnAccountComponent,
        DeleteAccountComponent,
        EditAccountComponent,
        AddAccountComponent,
        ChangePasswordDialogComponent,
        SmtpDialogComponent
    ],
    entryComponents: [
        AddEditAccountComponent,
        OptionalColumnAccountComponent,
        DeleteAccountComponent,
        ChangePasswordDialogComponent,
        SmtpDialogComponent
    ],
    providers: [
        AccountService
    ]
})
export class AccountModule { }
