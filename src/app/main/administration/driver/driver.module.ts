import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './component/driver-list/driver.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditDriverComponent } from './component/add-edit-driver/add-edit-driver.component';
import { DeleteDriverComponent } from './component/delete-driver/delete-driver.component';
import { OptionalColumnDriverComponent } from './component/optional-column-driver/optional-column-driver.component';
import { DriverAddComponent } from './component/driver-add/driver-add.component';
import { DriverViewEditComponent } from './component/driver-view-edit/driver-view-edit.component';
import {CustomPipeModule} from "../../../core/pipes/custom-pipe.module";
import {MaterialShared} from "../../../shared/material-shared";
import {CustomDirectivesModule} from "../../../core/directives/custom-directives.module";
import {DriverRoutingModule} from "./driver-routing.module";
import {DriverService} from "../../../core/services/driver.service";


@NgModule({
    imports: [
        CommonModule,
        CustomPipeModule,
        MaterialShared,
        FormsModule,
        CustomDirectivesModule,
        ReactiveFormsModule,
        DriverRoutingModule
    ],

    providers: [
        DriverService
    ],

    entryComponents: [
        AddEditDriverComponent,
        DeleteDriverComponent,
        OptionalColumnDriverComponent
    ],

    declarations: [
        DriverComponent,
        AddEditDriverComponent,
        DeleteDriverComponent,
        OptionalColumnDriverComponent,
        DriverAddComponent,
        DriverViewEditComponent
    ]
})
export class DriverModule { }
