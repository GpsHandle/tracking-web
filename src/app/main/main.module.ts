import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomDirectivesModule} from "../core/directives/custom-directives.module";
import {ProfileComponent} from "./profile/profile.component";
import {MaterialShared} from "../shared/material-shared";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomDirectivesModule,
        MaterialShared,
        MainRoutingModule,
        FlexLayoutModule,
        SharedModule    ],
    declarations: [
        MainComponent,
        ProfileComponent
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class MainModule { }
