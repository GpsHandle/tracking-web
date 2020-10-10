import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomPipeModule} from "../../pipes/custom-pipe.module";
import {AdministrationRoutingModule} from "./administration-routing.module";
import {AdministrationComponent} from "./layout/administration.component";
import {CustomDirectivesModule} from "../../directives/custom-directives.module";
import {MaterialShared} from "../../shared/material-shared";

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
