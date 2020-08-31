import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertProfileComponent } from './component/alert-profile-list/alert-profile.component';
import { AlertProfileRoutingModule } from 'app/main/administration/alert-profile/alert-profile-routing.module';
import { AddEditAlertProfileComponent } from './component/add-edit-alert-profile/add-edit-alert-profile.component';
import { MaterialShared } from 'app/shared/material-shared';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulerModule } from 'app/shared/scheduler/scheduler.module';
import { DeleteAlertProfileComponent } from './component/delete-alert-profile/delete-alert-profile.component';
import { GeozoneService } from 'app/services/geozone.service';
import { AlertProfileEditComponent } from './component/alert-profile-edit/alert-profile-edit.component';
import { AlertProfileAddComponent } from './component/alert-profile-add/alert-profile-add.component';
import { AssignToDeviceComponent } from './component/assign-to-device/assign-to-device.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        CustomDirectivesModule,
        AlertProfileRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SchedulerModule
    ],
    declarations: [
        AlertProfileComponent,
        AddEditAlertProfileComponent,
        DeleteAlertProfileComponent,
        AlertProfileEditComponent,
        AlertProfileAddComponent,
        AssignToDeviceComponent
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
