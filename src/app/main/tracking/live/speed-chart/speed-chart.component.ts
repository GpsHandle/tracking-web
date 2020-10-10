import {
    AfterViewChecked,
    AfterViewInit, ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChange
} from '@angular/core';
import { of as observableOf, ReplaySubject, merge } from 'rxjs';
import { catchError, map, startWith, switchMap} from 'rxjs/operators';
import * as d3 from 'd3';
import * as c3 from 'c3';
import { ChartConfiguration, Data, PrimitiveArray } from 'c3';
import { AxisName } from 'c3';
import {concat, forEach, head, isEmpty, last, uniqBy} from "lodash-es";
import {EventData} from "../../../../models/event-data";
import {EventService} from "../../../../services/event.service";

@Component({
    selector: 'speed-chart',
    templateUrl: './speed-chart.component.html',
    styleUrls: ['./speed-chart.component.scss']
})
export class SpeedChartComponent implements OnChanges, OnDestroy, OnInit, AfterViewInit, AfterViewChecked {
    get period() {
        return this._period;
    }

    @Input()
    set period(value) {
        this._period = value;
    }

    get device() {
        return this._device;
    }

    @Input()
    set device(value) {
        this._device = value;
    }

    get from() {
        return this._from;
    }

    set from(value) {
        this._from = value;
    }

    get to() {
        return this._to;
    }

    set to(value) {
        this._to = value;
    }
    get svg(): any {
        return this._svg;
    }

    set svg(value: any) {
        this._svg = value;
    }

    get chart(): any {
        return this._chart;
    }

    set chart(value: any) {
        this._chart = value;
    }

    get line(): d3.Line<any> {
        return this._line;
    }

    set line(value: d3.Line<any>) {
        this._line = value;
    }

    get xAxis(): any {
        return this._xAxis;
    }

    set xAxis(value: any) {
        this._xAxis = value;
    }

    get yAxis(): any {
        return this._yAxis;
    }

    set yAxis(value: any) {
        this._yAxis = value;
    }


    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get X() {
        return this._X;
    }

    set X(value) {
        this._X = value;
    }

    get Y() {
        return this._Y;
    }

    set Y(value) {
        this._Y = value;
    }
    private _device;
    private _period;
    private _from;
    private _to;

    private _width;
    private _height;

    private _X;
    private _Y;
    private _svg: any;
    private _chart: any;
    private _line: d3.Line<any>;
    private _xAxis: any;
    private _yAxis: any;

    dataChange: ReplaySubject<any>;
    private historyEventsOptimizeForChart: EventData[];
    loading: boolean = false;
    opac: number = 1;

    private interval: any;
    //-------------------------------------------------------------------------
    constructor(private eventService: EventService,
                private cdRef : ChangeDetectorRef) {
        this.dataChange = new ReplaySubject(1);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
        this.dataChange.next(100);
        this.loading = true;
        this.opac = 0.5;
    }

    ngOnDestroy(): void {
        clearInterval(this.interval)
    }

    ngAfterViewInit(): void {
        this.intervalUpdate();
        this.to = Date.now();
        this.from = this.to - this.period * 60 * 60 * 1000; // default 8 hours

        merge(this.dataChange)
            .pipe(
                startWith([]),
                switchMap(() => {
                    if (!this.device) {
                        return observableOf([]);
                    }
                    return this.eventService!.getHistoryEvents(this.device, this.from, this.to);
                }),
                map((data: any) => {
                    return data;
                }),
                catchError(() => {
                    return observableOf([]);
                })
            ).subscribe(
            (data: EventData[]) => {
                let h = head(data);
                let l = last(data);
                if (h && l) {
                    h.timestamp = this.from;
                    h.speedKPH=0;
                    l.timestamp+=1;
                    l.speedKPH=0;

                    let l1: EventData|any = {};
                    l1.timestamp = this.to;
                    l1.speedKPH = 0;

                    this.historyEventsOptimizeForChart = concat(h, data, l, l1);
                } else {
                    this.historyEventsOptimizeForChart = data;
                }

                this.loading = false;
                this.opac = 1;

                if (!isEmpty(this.historyEventsOptimizeForChart)) {
                    this.draw();
                } else {
                    this.historyEventsOptimizeForChart = [];
                    let h: any = {timestamp: this.from, speedKPH: 0};
                    let l: any = {timestamp: this.to, speedKPH: 0};
                    this.historyEventsOptimizeForChart.push(h, l);
                    this.draw();
                }
            });
    }

    private intervalUpdate() {
        this.interval = setInterval(() => {
            this.to = Date.now();
            this.from = this.to - this.period * 60 * 60 * 1000; // 6 hours
            this.dataChange.next(101);
        }, 10*1000);
    }

    private draw() {
        if (this.chart) {
            //update
            let X:Array<any> = ['timestamp'];
            let S:Array<any> = ['SpeedKPH'];
            let F:Array<any> = ['FuelLevel'];

            const ta = uniqBy(this.historyEventsOptimizeForChart, 'timestamp');
            forEach(ta, (d) => {
                X.push(d.timestamp);
                S.push(d.speedKPH);
                F.push(0);
            });

            let cols = [
                X, S, F
            ];
            this.chart.load({
                columns: cols
            });
        } else {
            let X: [string, ...PrimitiveArray] = ['timestamp'];
            let S: [string, ...PrimitiveArray] = ['SpeedKPH'];
            let F: [string, ...PrimitiveArray] = ['FuelLevel'];

            const ta = uniqBy(this.historyEventsOptimizeForChart, 'timestamp');

            forEach(ta, (d) => {
                X.push(d.timestamp);
                S.push(d.speedKPH);
                F.push(0);
            });

            const cols: Array<[string, ...PrimitiveArray]> = [
                X, S, F
            ];

            const y: AxisName = 'y';
            const y2: AxisName = 'y2';

            const axes: { [key: string]: AxisName } = {
                SpeedKPH: y,
                FuelLevel: y2
            };

            const data: Data = {
                columns: cols,
                axes: axes,
                x: 'timestamp'
            };

            const chartConfig: ChartConfiguration = {
                bindto: '#chart1',
                data: data,
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
            };

            this.chart = c3.generate(chartConfig);
        }
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }
}
