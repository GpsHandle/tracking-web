import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe} from "@angular/common";
import { HistoryComponent } from './history/history.component';
import { CommandComponent } from './live/command/command.component';
import { MatBottomSheet, MatBottomSheetContainer } from '@angular/material/bottom-sheet';
import {CustomPipeModule} from "../../pipes/custom-pipe.module";
import {MappingComponent} from "./live/mapping.component";
import {DeviceService} from "../../services/device.service";
import {EventService} from "../../services/event.service";
import {MaterialShared} from "../../shared/material-shared";
import {SpeedChartComponent} from "./live/speed-chart/speed-chart.component";
import {PopupService} from "./live/popup/popup.service";
import {MappingRoutingModule} from "./mapping-routing.module";
import {PopupComponent} from "./live/popup/popup.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MappingRoutingModule,
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
export class MappingModule { }
