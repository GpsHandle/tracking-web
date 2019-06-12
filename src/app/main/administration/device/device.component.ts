import * as _ from 'lodash';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Device } from 'app/models/device';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApplicationContext } from 'app/application-context';
import { DeviceService } from 'app/services/device.service';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/optional-column-device/optional-column-device.component';
import { AddEditDeviceComponent } from 'app/main/administration/device/add-edit-device/add-edit-device.component';
import { DeleteEvent } from 'app/models/delete-event';
import { DeviceRequest } from 'app/models/request/device.request';

import { merge } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DeleteDeviceComponent } from 'app/main/administration/device/delete-device/delete-device.component';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'applicationContext-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns = ['toggle', 'name', 'deviceId', 'companyName', 'vehicleName', 'protocol', 'lastEventTime', 'expiredOn', 'createdBy', 'createdOn', 'actions'];

    columns = {
        id: {selected: false, order: 0},
        name: {selected: false, order: 1},
        deviceId: {selected: false, order: 2},
        companyId: {selected: false, order: 3},
        companyName: {selected: false, order: 4},
        vehicleId: {selected: false, order: 5},
        vehicleName: {selected: false, order: 6},
        ipAddress: {selected: false, order: 7},
        port: {selected: false, order: 8},
        protocol: {selected: false, order: 9},
        status: {selected: false, order: 9},
        expiredOn: {selected: false, order: 9},
        serialNumber: {selected: false, order: 10},
        modelName: {selected: false, order: 11},
        manufacturerName: {selected: false, order: 12},
        firmwareVersion: {selected: false, order: 13},
        originalCountry: {selected: false, order: 14},
        lastEventTime: {selected: false, order: 141},
        createdBy: {selected: false, order: 15},
        createdOn: {selected: false, order: 16},
        updatedBy: {selected: false, order: 17},
        updatedOn: {selected: false, order: 18},
        actions: {selected: false, order: 19}
    };

    resultsLength = 0;
    dataSource: MatTableDataSource<Device> | null;
    dataChange: ReplaySubject<number>;

    cmd: string;

    constructor(private dialog: MatDialog,
                private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private service: DeviceService) {
    }

    ngOnInit() {
        this.initTableSettings();
        this.dataSource = new MatTableDataSource();
        this.dataChange = new ReplaySubject(1);

        this.route.queryParams.subscribe(
            params => {
                this.cmd = params['cmd'];
            }
        );
    }

    ngAfterViewInit(): void {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.dataSource.sort = this.sort;

        merge(this.sort.sortChange, this.paginator.page, this.dataChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.applicationContext.spin(true);
                    return this.service.searchAndSort(
                        this.paginator.pageIndex, this.paginator.pageSize,
                        this.sort.active, this.sort.direction);
                }),
                map((data: any) => {
                    this.applicationContext.spin(false);
                    this.resultsLength = data.totalElements;
                    return data.content;
                }),
                catchError(() => {
                    this.applicationContext.spin(false);
                    return observableOf([]);
                })
            ).subscribe(data => {
            this.dataSource.data = data;
            if (this.cmd === 'add') {
                this.openDialogNewObject();
            }
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    initTableSettings(): void {
        try {
            const displayeds = JSON.parse(localStorage.getItem('dev-disp-cols'));
            if (displayeds != null) {
                this.displayedColumns = displayeds;
            }
        } catch (e) {
            console.log(e);
        }

        // 2. generate new columns
        _.forOwn(this.columns, (value, key) => {
            if (this.displayedColumns.includes(key)) {
                value.selected = true;
            }
        });
    }

    openDialogColumnOptions(): void {
        const dialogRef = this.dialog.open(OptionalColumnDeviceComponent, {
            data: this.columns
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.displayedColumns = [];
                    _.forOwn(this.columns, (value, key) => {
                        if (value.selected) {
                            this.displayedColumns.push(key);
                        }
                    });
                }
                localStorage.setItem('dev-disp-cols', JSON.stringify(this.displayedColumns));
            }
        );
    }

    openDialogNewObject(): void {
        const data = new Device();
        //data.companyId = this.applicationContext.getCurrentAccount().organizationId;
        const dialogRef = this.dialog.open(AddEditDeviceComponent, {
            width: '800px',
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closing dialog');
            this.cmd = undefined;
            if (result) {
                this.create(result);
            }
        });
    }

    create(device: DeviceRequest): void {
        this.service.create(device).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

    openDialogEditing(data: Device): void {
        if (data.company === null) {
            data.company = {};
        }
        const dialogRef = this.dialog.open(AddEditDeviceComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.update(result);
            }
        });
    }

    update(device: DeviceRequest): void {
        this.service.update(device.id, device).subscribe(
            response => {
                this.dataChange.next(0);
            }
        );
    }

    openDialogConfirmDelete(device: Device): void {
        const data = new DeleteEvent();
        data.setId(device.id);
        data.setName(device.name);
        data.setType('Device');
        const dialogRef = this.dialog.open(DeleteDeviceComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._delete(device.id);
            }
        });
    }

    _delete(deviceId: number): void {
        this.service._delete(deviceId).subscribe(
            data => {
                this.dataChange.next(0);
            },
            error => {
                //this.dataChange.next(error);
            },
            () => {
                //this.dataChange.next(1);
            }
        );
    }

    checkStatus(device: Device): boolean {
        return _.toLower(device.status) === 'enabled';
    }

    toggleStatus(device: Device) {
        if (this.checkStatus(device)) {
            device.status = 'disabled';
        } else {
            device.status = 'enabled';
        }

        let request = new DeviceRequest(device);
        this.service.update(device.id, request).subscribe(
            data => {
            },
            error => {
            },
            () => {
                this.applicationContext.info('Updated device #id: ' + device.id);
            }
        );
    }

}
