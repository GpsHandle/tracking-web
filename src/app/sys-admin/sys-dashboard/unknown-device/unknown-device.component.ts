import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UnknownDevice } from 'app/models/unknown-device';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UnknownDeviceService } from 'app/services/unknown-device.service';
import { merge, of as observableOf, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApplicationContext } from 'app/application-context';
import { Device } from 'app/models/device';
import { AddNewDeviceComponent } from 'app/sys-admin/sys-dashboard/add-new-device/add-new-device.component';

@Component({
    selector: 'app-unknown-device',
    templateUrl: './unknown-device.component.html',
    styleUrls: ['./unknown-device.component.scss']
})
export class UnknownDeviceComponent implements OnInit, AfterViewInit, AfterViewChecked {

    dataSource: MatTableDataSource<UnknownDevice>;
    dataChange: ReplaySubject<any>;
    resultsLength = 0;
    displayedColumns = ['id', 'uniqueId', 'remoteIpAddress', 'port', 'createdOn', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dialog: MatDialog,
                private unkownDeviceService: UnknownDeviceService,
                private applicationContext: ApplicationContext) { }

    ngOnInit() {
        this.dataChange = new ReplaySubject(1);
        this.dataSource = new MatTableDataSource();
    }

    ngAfterViewChecked(): void {
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.dataSource.sort = this.sort;
        merge(this.sort.sortChange, this.paginator.page, this.dataChange)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.applicationContext.spin(true);
                return this.unkownDeviceService!.searchAndSort(
                    this.paginator.pageIndex, this.paginator.pageSize,
                    this.sort.active, this.sort.direction);
            }),
            map(data => {
            this.resultsLength = data.totalElements;
            return data.content;
            }),
            catchError(() => {
                return observableOf([]);
            }))
        .subscribe(
            data => {
                this.dataSource.data = data;
                this.applicationContext.spin(false);
            });
    }

    addNewDevice(element: UnknownDevice) {
        const data = new Device();
        const dialogRef = this.dialog.open(AddNewDeviceComponent, {
            width: '800px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closing dialog');
            // this.cmd = undefined;
            // if (result) {
            //     this.create(result);
            // }
        });
    }
}
