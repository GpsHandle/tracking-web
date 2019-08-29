import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { DeviceReportService } from 'app/services/device-report.service';
import { MatTableDataSource } from '@angular/material';
import { ReplaySubject } from 'rxjs';
import { DeviceParkingReport } from 'app/models/device-parking.report';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ApplicationContext } from 'app/application-context';

import { formatDistance } from 'date-fns'

@Component({
    selector: 'rpt-parking',
    templateUrl: './parking.component.html',
    styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnChanges, OnInit, AfterViewInit {
    private _device: number;
    private _from: number;
    private _to: number;

    dataSource: MatTableDataSource<DeviceParkingReport>;
    resultsLength: number;
    dataChange: ReplaySubject<any>;
    displayedColumns = ['latlng', 'altitude', 'odometerKM', 'speedKPH', 'heading', 'status', 'address', 'timestamp', 'stoppedTime'];

    constructor(private deviceReportService: DeviceReportService,
                private applicationContext: ApplicationContext) {
        this.dataChange = new ReplaySubject(1);
    }

    get device(): number {
        return this._device;
    }

    @Input()
    set device(value: number) {
        this._device = value;
    }

    get from(): number {
        return this._from;
    }

    @Input()
    set from(value: number) {
        this._from = value;
    }

    get to(): number {
        return this._to;
    }

    @Input()
    set to(value: number) {
        this._to = value;
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
        //this.loadData();
        this.dataChange.next(100);
    }
    ngAfterViewInit(): void {

        merge(this.dataChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    //this.spinner.show(true);
                    //this.applicationContext.spin(true);
                    if (!this.device) {
                        return observableOf([]);
                    }
                    return this.deviceReportService!.getParkingReport(this.device, this.from, this.to);
                }),
                map((data: any) => {
                    return data;
                }),
                catchError(() => {
                    return observableOf([]);
                })
            ).subscribe(
            data => {
                this.dataSource.data = data;
                //this.spinner.show(false);
                //this.applicationContext.spin(false);
            });
    }

    timeDistance(period: number): string {
        return formatDistance(0, period);
    }
}
