import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertProfileComponent } from './component/alert-profile-list/alert-profile.component';
import { AddEditAlertProfileComponent } from './component/add-edit-alert-profile/add-edit-alert-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteAlertProfileComponent } from './component/delete-alert-profile/delete-alert-profile.component';
import { AlertProfileEditComponent } from './component/alert-profile-edit/alert-profile-edit.component';
import { AlertProfileAddComponent } from './component/alert-profile-add/alert-profile-add.component';
import { AssignToDeviceComponent } from './component/assign-to-device/assign-to-device.component';
import {GeozoneService} from "../../../services/geozone.service";
import {AlertProfileRoutingModule} from "./alert-profile-routing.module";
import {CustomDirectivesModule} from "../../../directives/custom-directives.module";
import {MaterialShared} from "../../../shared/material-shared";
import {SchedulerModule} from "../../../shared/scheduler/scheduler.module";

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
