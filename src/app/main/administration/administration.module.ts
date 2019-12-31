import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from 'app/main/administration/layout/administration.component';
import { AdministrationRoutingModule} from 'app/main/administration/administration-routing.module';
import { MaterialShared} from 'app/shared/material-shared';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';

@NgModule({
    imports: [
        CustomPipeModule,
        CommonModule,
        MaterialShared,
        FormsModule,
        CustomDirectivesModule,
        ReactiveFormsModule,
        AdministrationRoutingModule
    ],
    declarations: [
        AdministrationComponent,
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class AdministrationModule { }
