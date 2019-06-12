import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceLittle } from 'app/models/little/device.little';
import { MatDialog, MatDrawer, MatTabChangeEvent} from '@angular/material';
import { DeviceService } from 'app/services/device.service';
import { ApplicationContext } from 'app/application-context';
import { DeviceReportService } from 'app/services/device-report.service';
import { DeviceReportCustomTimeComponent } from 'app/main/report/device-report/device-report-custom-time/device-report-custom-time.component';
import { EventService } from 'app/services/event.service';
import { EventData } from 'app/models/event-data';
import { merge, of as observableOf, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { saveAs } from 'file-saver';

@Component({
    selector: 'app-report',
    templateUrl: './device-report.component.html',
    styleUrls: ['./device-report.component.scss']
})
export class DeviceReportComponent implements OnInit {
    deviceList: DeviceLittle[];
    selected: DeviceLittle | any;
    tIcon: string = 'back';

    from: number = 0;
    to: number = 0;
    eventList: Array<EventData>;
    dataChange: ReplaySubject<any>;

    selectedTab: Tabs;

    @ViewChild(MatDrawer, { static: true }) sideNav: MatDrawer;


    constructor(
        private matDialog: MatDialog,
        private deviceService: DeviceService,
        private eventService: EventService,
        private deviceReportService: DeviceReportService,
        private applicationContext: ApplicationContext) { }

    ngOnInit() {
        this.selectedTab = Tabs.SPEED_REPORT;
        this.dataChange = new ReplaySubject(1);
        this.eventList = [];
        this.selected = {};
        this.loadEventData();

        console.log('Starting report page');

        this.applicationContext.spinAt('deviceList', true);
        this.deviceService.getAllLittle().subscribe(
            response => {
                this.applicationContext.spinAt('deviceList', false);
                this.deviceList = response;
                this.selected = this.deviceList[0];
                this.dataChange.next(1);
            },
            error => {
                this.applicationContext.spinAt('deviceList', false);
            },
            () => {
            }
        );

    }

    private loadEventData() {
        merge(this.dataChange)
            .pipe(
                startWith([]),
                switchMap(() => {
                    if (!this.selected.id) {
                        return observableOf([]);
                    }
                    return this.eventService!.getHistoryEvents(this.selected.id, this.from, this.to);
                }),
                map((data: any) => {
                    return data;
                }),
                catchError(() => {
                    return observableOf([]);
                })
            ).subscribe(
            (data: EventData[]) => {
                this.eventList = data;
            });

    }


    applyFilter(filterValue: string) {
        // filterValue = filterValue.trim(); // Remove whitespace
        // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        // this.deviceTableDataSource.filter = filterValue;
    }


    selectThisDevice(device: DeviceLittle): void {
        console.log('Device: ', device);
        this.selected = device;
        this.dataChange.next(1);
    }

    tonggleSidebar(e: any) {
        e.stopPropagation();
        this.sideNav.toggle();
        this.tIcon = this.sideNav.opened ? 'back' : 'sub-menu';
    }

    last2hours(event: Event): void {
        event.stopPropagation();
        this.to = Date.now();
        this.from = this.to - 2 * 3600 * 1000;
        this.dataChange.next(1);
    }

    last8hours(event: Event): void {
        event.stopPropagation();
        this.to = Date.now();
        this.from = this.to - 8 * 3600 * 1000;
        this.dataChange.next(1);
    }

    last24hours(event: Event): void {
        event.stopPropagation();
        this.to = Date.now();
        this.from = this.to - 24 * 3600 * 1000;
        this.dataChange.next(1);
    }

    last72hours(event: Event): void {
        event.stopPropagation();
        this.to = Date.now();
        this.from = this.to - 72 * 3600 * 1000;
        this.dataChange.next(1);
    }

    customTime(event: Event) {
        event.stopPropagation();
        const dialogRef = this.matDialog.open(DeviceReportCustomTimeComponent, {
            minWidth: '480px'
        });
        //this.showCustom = !this.showCustom;
    }

    //----------export----------//
    export(event: Event, fmt?: string) {
        event.stopPropagation();
        this.applicationContext.spin(true);

        let type = 'speed';
        switch (this.selectedTab) {
            case Tabs.SPEED_REPORT:
                type = 'speed';
                break;
            case Tabs.PARKING_REPORT:
                type = 'parking';
                break;
            case Tabs.GEOZONE_REPORT:
                type = 'geozone';
                break;
            case Tabs.ALERT_HISTORY:
                type = 'alert';
        }

        let fileName = type+'_report.' + fmt;
        this.deviceReportService.export(this.selected.id, this.from, this.to, type, fmt).subscribe(
            (data) => {
                this.applicationContext.spin(false);
                saveAs(data.body, fileName );
            },
            error => {
                this.applicationContext.spin(false);
                this.applicationContext.error(error);
                //console.log('Data', error);
            },
            () => {
                this.applicationContext.spin(false);
                //console.log('Completed');
            }
        );
    }

    onTabChanged(event: MatTabChangeEvent) {
        console.log('Event', event);
        switch (event.index) {
            case 0:
                this.selectedTab = Tabs.SPEED_REPORT;
                break;
            case 1:
                this.selectedTab = Tabs.PARKING_REPORT;
                break;
            case 2:
                this.selectedTab = Tabs.GEOZONE_REPORT;
                break;
            case 3:
                this.selectedTab = Tabs.ALERT_HISTORY;
                break;
        }
    }
}

export enum Tabs {
    SPEED_REPORT,
    PARKING_REPORT,
    GEOZONE_REPORT,
    ALERT_HISTORY
}