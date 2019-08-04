import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from 'app/main/administration/account/account-routing.module';
import { AccountComponent } from 'app/main/administration/account/account.component';
import { AddEditAccountComponent } from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import { OptionalColumnAccountComponent } from 'app/main/administration/account/optional-column-account/optional-column-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialShared } from 'app/shared/material-shared';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { AccountService } from 'app/services/account.service';

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
        DeleteAccountComponent
    ],
    entryComponents: [
        AddEditAccountComponent,
        OptionalColumnAccountComponent,
        DeleteAccountComponent
    ],
    providers: [
        AccountService
    ]
})
export class AccountModule { }
