import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLineChartComponent } from 'app/cutom-component/event-line-chart/event-line-chart.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        EventLineChartComponent
    ],
    declarations: [
        EventLineChartComponent
    ]
})
export class CustomComponentModule { }
