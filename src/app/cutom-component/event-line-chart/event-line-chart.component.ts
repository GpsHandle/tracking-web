import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChange
} from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';
import { AxisName, ChartAPI, ChartConfiguration, PrimitiveArray } from 'c3';
import {forEach, uniqBy,} from 'lodash-es';
import {EventData} from "../../models/event-data";

@Component({
    selector: 'event-line-chart',
    templateUrl: './event-line-chart.component.html',
    styleUrls: ['./event-line-chart.component.scss']
})
export class EventLineChartComponent implements OnInit, AfterViewChecked, OnChanges {
    private _eventList: Array<EventData>;
    private _chart: ChartAPI;

    get eventList(): Array<EventData> {
        return this._eventList;
    }

    @Input()
    set eventList(value: Array<EventData>) {
        this._eventList = value;
    }

    get chart(): ChartAPI {
        return this._chart;
    }

    set chart(value: ChartAPI) {
        this._chart = value;
    }

    constructor(private cdRef : ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
        this.draw();
    }

    private draw() {
        if (this.eventList && this.eventList.length > 0) {
            if (this.chart) {
                //update
                let X:[string, ...PrimitiveArray] = ['timestamp'];
                let S:[string, ...PrimitiveArray] = ['SpeedKPH'];
                let F:[string, ...PrimitiveArray] = ['FuelLevel'];
                let B:[string, ...PrimitiveArray] = ['Battery'];

                const ta = uniqBy(this.eventList, 'timestamp');
                if (ta && ta.length > 0) {
                    forEach(ta, (d) => {
                        X.push(d.timestamp);
                        S.push(d.speedKPH);
                        F.push(d.fuelLevel);
                        B.push(d.batteryLevel);
                    });

                    const columns: Array<[string, ...PrimitiveArray]> = [X, S, F, B];

                    this.chart.load({
                        columns: columns
                    });
                }
            } else {
                let X:[string, ...PrimitiveArray] = ['timestamp'];
                let S:[string, ...PrimitiveArray] = ['SpeedKPH'];
                let F:[string, ...PrimitiveArray] = ['FuelLevel'];
                let B:[string, ...PrimitiveArray] = ['Battery'];

                const ta = uniqBy(this.eventList, 'timestamp');

                forEach(ta, (d) => {
                    X.push(d.timestamp);
                    S.push(d.speedKPH);
                    F.push(d.fuelLevel);
                    B.push(d.batteryLevel);
                });

                const columns: Array<[string, ...PrimitiveArray]> = [
                    X, S, F, B
                ];

                const y: AxisName = 'y';
                const y2: AxisName = 'y2';

                this.chart = c3.generate({
                    bindto: '#event-line-chart',
                    data: {
                        columns: columns,
                        axes: {
                            SpeedKPH: y,
                            FuelLevel: y2
                        },
                        x: 'timestamp'
                    },
                    transition: {
                        duration: 0
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                count: 10,
                                format: '%H:%M'
                            }
                        },
                        y: {
                            label: 'Speed KPH',
                            min: 0,
                            padding: {
                                bottom: 0
                            },
                            tick: {
                                count: 5,
                                format: function(x) {
                                    return d3.format('.0f')(x);
                                }
                            }
                        },
                        y2: {
                            label: 'Fuel Level',
                            show: true
                        }
                    },
                    grid: {
                        x: {
                            show: true
                        },
                        y: {
                            show: true
                        }
                    },
                    point: {
                        show: false
                    }
                });
            }
        }
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }
}
