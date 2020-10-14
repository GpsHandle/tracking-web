import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteAccountComponent } from './component/delete-account/delete-account.component';
import { EditAccountComponent } from './component/account-edit/edit-account.component';
import { AccountUpdateComponent } from './component/account-add/account-update.component';
import { ChangePasswordDialogComponent } from './component/change-password-dialog/change-password-dialog.component';
import {SharedModule} from "../../../shared/shared.module";
import {CustomPipeModule} from "../../../core/pipes/custom-pipe.module";
import {AccountComponent} from "./component/account-list/account.component";
import {CustomDirectivesModule} from "../../../core/directives/custom-directives.module";
import {AccountRoutingModule} from "./account-routing.module";
import {OptionalColumnAccountComponent} from "./component/optional-column-account/optional-column-account.component";
import {MaterialShared} from "../../../shared/material-shared";
import {AddEditAccountComponent} from "./component/add-edit-account/add-edit-account.component";
import {AccountService} from "../../../core/services/account.service";

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
