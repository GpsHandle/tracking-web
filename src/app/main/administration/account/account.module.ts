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
import { AccountUpdateComponent } from './component/account-add/account-update.component';
import { ChangePasswordDialogComponent } from './component/change-password-dialog/change-password-dialog.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        CustomPipeModule,
        CustomDirectivesModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialShared,
        AccountRoutingModule,
        SharedModule,
    ],
    declarations: [
        AccountComponent,
        AddEditAccountComponent,
        OptionalColumnAccountComponent,
        DeleteAccountComponent,
        EditAccountComponent,
        AccountUpdateComponent,
        ChangePasswordDialogComponent
    ],
    entryComponents: [
        AddEditAccountComponent,
        OptionalColumnAccountComponent,
        DeleteAccountComponent,
        ChangePasswordDialogComponent
    ],
    providers: [
        AccountService
    ]
})
export class AccountModule { }
