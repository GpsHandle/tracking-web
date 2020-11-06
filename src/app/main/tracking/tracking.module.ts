import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe} from "@angular/common";
import { HistoryComponent } from './history/history.component';
import { CommandComponent } from './live/command/command.component';
import { MatBottomSheet, MatBottomSheetContainer } from '@angular/material/bottom-sheet';
import {CustomPipeModule} from "../../core/pipes/custom-pipe.module";
import {MappingComponent} from "./live/mapping.component";
import {DeviceService} from "../../core/services/device.service";
import {EventService} from "../../core/services/event.service";
import {MaterialShared} from "../../shared/material-shared";
import {SpeedChartComponent} from "./live/speed-chart/speed-chart.component";
import {PopupService} from "./live/popup/popup.service";
import {TrackingRoutingModule} from "./tracking-routing.module";
import {PopupComponent} from "./live/popup/popup.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TrackingRoutingModule,
        MaterialShared,
        CustomPipeModule
    ],
    providers: [
        DeviceService,
        PopupService,
        EventService,
        DatePipe,
        MatBottomSheet
    ],

    entryComponents: [
        PopupComponent,
        MatBottomSheetContainer,
        CommandComponent
    ],
    declarations: [
        MappingComponent,
        HistoryComponent,
        PopupComponent,
        SpeedChartComponent,
        CommandComponent
    ]
})
export class TrackingModule { }
