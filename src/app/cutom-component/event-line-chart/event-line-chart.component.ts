import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChange
} from '@angular/core';
import { EventData } from 'app/models/event-data';
import * as _ from 'lodash';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
    selector: 'event-line-chart',
    templateUrl: './event-line-chart.component.html',
    styleUrls: ['./event-line-chart.component.scss']
})
export class EventLineChartComponent implements OnInit, AfterViewChecked, OnChanges {
    private _eventList: Array<EventData>;
    private _chart: any;

    get eventList(): Array<EventData> {
        return this._eventList;
    }

    @Input()
    set eventList(value: Array<EventData>) {
        this._eventList = value;
    }

    get chart(): any {
        return this._chart;
    }

    set chart(value: any) {
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
                let X:Array<any> = ['timestamp'];
                let S:Array<any> = ['SpeedKPH'];
                let F:Array<any> = ['FuelLevel'];
                let B:Array<any> = ['Battery'];

                const ta = _.uniqBy(this.eventList, 'timestamp');

                console.log('drawing+ta', ta);

                if (ta && ta.length > 0) {
                    _.forEach(ta, (d) => {
                        X.push(d.timestamp);
                        S.push(d.speedKPH);
                        F.push(d.fuelLevel);
                        B.push(d.batteryLevel);
                    });

                    let cols = [
                        X, S, F, B
                    ];
                    this.chart.load({
                        columns: cols
                    });
                }
            } else {
                let X:Array<any> = ['timestamp'];
                let S:Array<any> = ['SpeedKPH'];
                let F:Array<any> = ['FuelLevel'];
                let B:Array<any> = ['Battery'];

                const ta = _.uniqBy(this.eventList, 'timestamp');

                _.forEach(ta, (d) => {
                    X.push(d.timestamp);
                    S.push(d.speedKPH);
                    F.push(d.fuelLevel);
                    B.push(d.batteryLevel);
                });

                let cols = [
                    X, S, F, B
                ];

                this.chart = c3.generate({
                    bindto: '#event-line-chart',
                    data: {
                        columns: cols,
                        axes: {
                            SpeedKPH: 'y',
                            FuelLevel: 'y2'
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
