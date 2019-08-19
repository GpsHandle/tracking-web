import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceLittle } from 'app/models/little/device.little';
import { MatDialog, MatDrawer, MatTabChangeEvent} from '@angular/material';
import { DeviceService } from 'app/services/device.service';
import { ApplicationContext } from 'app/application-context';
import { DeviceReportService } from 'app/services/device-report.service';
import { DeviceReportCustomTimeComponent } from 'app/main/report/device-report/component/custom-timerange-dialog/device-report-custom-time.component';
import { EventService } from 'app/services/event.service';
import { EventData } from 'app/models/event-data';
import { merge, of as observableOf, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DeviceReportCommService } from 'app/main/report/device-report/service/device-report-comm.service';

@Component({
    selector: 'app-report',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    deviceList: DeviceLittle[];
    selected: DeviceLittle | any;
    from: number = 0;
    to: number = 0;
    dataChange: ReplaySubject<any>;
    @ViewChild(MatDrawer, { static: true }) sideNav: MatDrawer;
    constructor(
        private deviceService: DeviceService,
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
        this.applicationContext.spinAt('deviceList', true);
        this.deviceService.getAllLittle().subscribe(
            response => {
                this.applicationContext.spinAt('deviceList', false);
                this.deviceList = response;
            },
            error => {
                this.applicationContext.spinAt('deviceList', false);
            },
            () => {
            }
        );

    }

    applyFilter(filterValue: string) {
        // filterValue = filterValue.trim(); // Remove whitespace
        // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        // this.deviceTableDataSource.filter = filterValue;
    }
}

