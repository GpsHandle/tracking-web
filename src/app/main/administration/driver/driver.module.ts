import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { DriverRoutingModule } from 'app/main/administration/driver/driver-routing.module';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';
import { MaterialShared } from 'app/shared/material-shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { DriverService } from 'app/services/driver.service';
import { AddEditDriverComponent } from './add-edit-driver/add-edit-driver.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { OptionalColumnDriverComponent } from './optional-column-driver/optional-column-driver.component';

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
        OptionalColumnDriverComponent
    ]
})
export class DriverModule { }
