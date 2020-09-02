import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of as observableOf, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { AlertEventLog } from 'app/models/alert-event-log';
import { DeviceReportService } from 'app/services/device-report.service';
import { PageableCommonResponse } from 'app/models/pageable-common.response';

@Component({
    selector: 'app-alert-history',
    templateUrl: './alert-logs.component.html',
    styleUrls: ['./alert-logs.component.scss']
})
export class AlertLogsComponent implements OnChanges, OnInit, AfterViewInit {
    private _device: number;
    private _from: number;
    private _to: number;

    dataSource: MatTableDataSource<AlertEventLog>;
    resultsLength: number;
    dataChange: ReplaySubject<number>;

    displayedColumns = [
        'id',
        'alertName',
        'alertDescription',
        'latlng',
        'address',
        'type',
        'speedKph',
        'zoneId',
        'alertEmail',
        'alertSms',
        'alertApp',
        'cannedAction',
        'receivers',
        'subject',
        'text'
    ];
    ngNoData: Observable<boolean>;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private deviceReportService: DeviceReportService) {
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

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource();
        this.ngNoData = this.dataSource.connect().pipe(map(data => data.length === 0));
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
        this.dataChange.next(100);
    }

    ngAfterViewInit(): void {
        console.log("Come Here!");
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page, this.dataChange)
        .pipe(
            startWith([]),
            switchMap(() => {
                if (!this.device) {
                    return observableOf([]);
                }
                return this.deviceReportService.getAlertLogs(
                    this.device, this.from, this.to,
                    this.paginator.pageIndex,
                    this.paginator.pageSize,
                    this.sort.active,
                    this.sort.direction);
            }),
            map((data: PageableCommonResponse<AlertEventLog>) => {
                this.resultsLength = data.totalElements;
                return data.content;
            }),
            catchError(() => {
                return observableOf([]);
            })
        ).subscribe(
            data => {this.dataSource.data = data;}
        );
    }
}
