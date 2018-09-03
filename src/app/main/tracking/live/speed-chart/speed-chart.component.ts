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
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { EventService } from 'app/services/event.service';
import { merge, of as observableOf } from 'rxjs/index';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as d3 from 'd3';
import * as c3 from 'c3';
import { EventData } from 'app/models/event-data';
import * as _ from 'lodash';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

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
    private alive: boolean = true;
    private subscription;
    //-------------------------------------------------------------------------
    constructor(private eventService: EventService, private cdRef : ChangeDetectorRef) {
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
        this.alive = false;
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
                let h = _.head(data);
                let l = _.last(data);
                if (h && l) {
                    h.timestamp = this.from;
                    h.speedKPH=0;
                    l.timestamp+=1;
                    l.speedKPH=0;

                    let l1: EventData|any = {};
                    l1.timestamp = this.to;
                    l1.speedKPH = 0;

                    this.historyEventsOptimizeForChart = _.concat(h, data, l, l1);
                } else {
                    this.historyEventsOptimizeForChart = data;
                }
                this.loading = false;
                this.opac = 1;
                if (!_.isEmpty(this.historyEventsOptimizeForChart)) {
                    this.draw();
                } else {
                    this.historyEventsOptimizeForChart = [];
                    this.draw();
                }
            });
    }

    private intervalUpdate() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = TimerObservable.create(15, 15 * 1000)
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.to = Date.now();
                this.from = this.to - this.period * 60 * 60 * 1000; // 6 hours
                this.dataChange.next(101);
            });
    }

    private draw() {
        if (this.chart) {
            //update
            let X:Array<any> = ['timestamp'];
            let S:Array<any> = ['SpeedKPH'];
            let F:Array<any> = ['FuelLevel'];

            const ta = _.uniqBy(this.historyEventsOptimizeForChart, 'timestamp');
            _.forEach(ta, (d) => {
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
            let X:Array<any> = ['timestamp'];
            let S:Array<any> = ['SpeedKPH'];
            let F:Array<any> = ['FuelLevel'];

            const ta = _.uniqBy(this.historyEventsOptimizeForChart, 'timestamp');

            _.forEach(ta, (d) => {
                X.push(d.timestamp);
                S.push(d.speedKPH);
                F.push(0);
            });

            let cols = [
                X, S, F
            ];

            this.chart = c3.generate({
                bindto: '#chart1',
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

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }
}
