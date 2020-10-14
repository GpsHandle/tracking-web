import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GeozoneService} from "../../../core/services/geozone.service";
import {MaterialShared} from "../../../shared/material-shared";
import {GeozoneRoutingModule} from "./geozone-routing.module";
import {GeozoneComponent} from "./geozone.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialShared,
        GeozoneRoutingModule
    ],
    providers: [
        GeozoneService
    ],
    declarations: [
        GeozoneComponent
    ],
    entryComponents: []
})
export class GeozoneModule { }
