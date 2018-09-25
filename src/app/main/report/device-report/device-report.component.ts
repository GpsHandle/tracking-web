import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceLittle } from 'app/models/little/device.little';
import { MatDialog, MatDrawer, MatSidenav, MatTableDataSource } from '@angular/material';
import { DeviceService } from 'app/services/device.service';
import { ApplicationContext } from 'app/application-context';
import { DeviceReportService } from 'app/services/device-report.service';
import { DeviceReportCustomTimeComponent } from 'app/main/report/device-report/device-report-custom-time/device-report-custom-time.component';
import { EventService } from 'app/services/event.service';
import { EventData } from 'app/models/event-data';
import { merge, of as observableOf, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { saveAs } from 'file-saver/FileSaver';

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

    @ViewChild(MatDrawer) sideNav: MatDrawer;

    constructor(
        private matDialog: MatDialog,
        private deviceService: DeviceService,
        private eventService: EventService,
        private deviceReportService: DeviceReportService,
        private applicationContext: ApplicationContext) { }

    ngOnInit() {
        this.dataChange = new ReplaySubject(1);
        this.eventList = [];
        this.applicationContext.spin(true);
        this.selected = {};
        this.deviceService.getAllLittle().subscribe(
            response => {
                this.deviceList = response;
                this.selected = this.deviceList[0];
            },
            error => {},
            () => {
                this.applicationContext.spin(false);
                //this.loadEventData();
                this.dataChange.next(1);
            }
        );
        this.loadEventData();
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

    last2hours(): void {
        this.to = Date.now();
        this.from = this.to - 2 * 3600 * 1000;
        this.dataChange.next(1);
    }

    last8hours(): void {
        this.to = Date.now();
        this.from = this.to - 8 * 3600 * 1000;
        this.dataChange.next(1);
    }

    last24hours(): void {
        this.to = Date.now();
        this.from = this.to - 24 * 3600 * 1000;
        this.dataChange.next(1);
    }

    last72hours(): void {
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
    exportPdf() {
        this.applicationContext.spin(true);
        this.deviceReportService.exportSpeedReport(this.selected.id, this.from, this.to).subscribe(
            (data) => {
                console.log('Data', data);
                this.applicationContext.spin(false);
                saveAs(data, 'device-report.pdf');
            },
            error => {
                console.log('Data', error);
            },
            () => {
                console.log('Completed');
            }
        );
    }
}
