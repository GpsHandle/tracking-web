import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertProfileComponent } from './alert-profile.component';
import { AlertProfileRoutingModule } from 'app/main/administration/alert-profile/alert-profile-routing.module';
import { AddEditAlertProfileComponent } from './add-edit-alert-profile/add-edit-alert-profile.component';
import { MaterialShared } from 'app/shared/material-shared';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulerModule } from 'app/shared/scheduler/scheduler.module';
import { ContactModule } from 'app/main/administration/contact/contact.module';
import { DeleteAlertProfileComponent } from './delete-alert-profile/delete-alert-profile.component';
import { GeozoneService } from 'app/services/geozone.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        CustomDirectivesModule,
        AlertProfileRoutingModule,
        ReactiveFormsModule,
        ContactModule,
        FormsModule,
        SchedulerModule
    ],
    declarations: [
        AlertProfileComponent,
        AddEditAlertProfileComponent,
        DeleteAlertProfileComponent
    ],
    entryComponents: [
        AddEditAlertProfileComponent,
        DeleteAlertProfileComponent
    ],
    providers: [
        GeozoneService
    ]
})
export class AlertProfileModule { }
