import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceLittle } from 'app/models/little/device.little';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeviceService } from 'app/services/device.service';
import { ApplicationContext } from 'app/application-context';
import { DeviceReportService } from 'app/services/device-report.service';
import { DeviceReportCustomTimeComponent } from 'app/main/report/device-report/component/custom-timerange-dialog/device-report-custom-time.component';
import { EventService } from 'app/services/event.service';
import { EventData } from 'app/models/event-data';
import { merge, Observable, of as observableOf, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DeviceReportCommService } from 'app/main/report/device-report/service/device-report-comm.service';
import { Device } from 'app/models/device';
import { DashboardService } from 'app/main/report/device-report/service/dashboard.service';

@Component({
    selector: 'app-report',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    deviceList: Device[];
    selected: DeviceLittle | any;
    from: number = 0;
    to: number = 0;

    @ViewChild(MatDrawer, { static: true }) sideNav: MatDrawer;
    constructor(
        private deviceService: DeviceService,
        private dashboardService: DashboardService,
        private deviceReportCommService: DeviceReportCommService,
        private applicationContext: ApplicationContext) {

        this.deviceReportCommService.command$.subscribe(
            (command : string) => {
                if (command === 'TOGGLE_SIDE_NAV') {
                    this.sideNav.toggle();
                }
            }
        )
    }

    ngOnInit() {
        this.deviceService.getAllDevice().pipe(
            startWith([]),
            map(value => {
                return value;
            })
        ).subscribe(
            devices => {
                this.deviceList = devices;
                this.dashboardService.cacheDevices(devices);
            }
        );

        // this.deviceList$.subscribe(devices => {
        //     this.dashboardService.cacheDevices(devices);
        // });
    }

    applyFilter(filterValue: string) {
        // filterValue = filterValue.trim(); // Remove whitespace
        // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        // this.deviceTableDataSource.filter = filterValue;
    }

    trackByFn(index, item) {
        return item.id;
    }
}

