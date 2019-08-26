import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MappingRoutingModule } from 'app/main/tracking/mapping-routing.module';
import { MappingComponent } from 'app/main/tracking/live/mapping.component';
import { CommonModule, DatePipe} from "@angular/common";
import { DeviceService} from 'app/services/device.service';
import {EventService} from 'app/services/event.service';
import { MaterialShared } from 'app/shared/material-shared';
import { HistoryComponent } from './history/history.component';
import { PopupService } from 'app/main/tracking/live/popup/popup.service';
import { PopupComponent } from 'app/main/tracking/live/popup/popup.component';
import { SpeedChartComponent } from 'app/main/tracking/live/speed-chart/speed-chart.component';
import { CommandComponent } from './live/command/command.component';
import { MatBottomSheet, MatBottomSheetContainer } from '@angular/material';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';


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
