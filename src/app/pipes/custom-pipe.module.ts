import { NgModule } from '@angular/core';
import { TimeDistancePipe } from './time-distance.pipe';
import {OrderBy} from "./order-by.pipe";
import {FilterPipe} from "./filter.pipe";
import {FlattenPipe} from "./flatten.pipe";

@NgModule({
    imports: [
    ],
    declarations: [
        OrderBy,
        FilterPipe,
        FlattenPipe,
        TimeDistancePipe
    ],
    exports: [
        OrderBy,
        FilterPipe,
        FlattenPipe,
        TimeDistancePipe
    ]
})
export class CustomPipeModule { }
