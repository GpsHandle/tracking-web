import { Component, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { merge, of as observableOf, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {ApplicationContext} from "../../../../../application-context";
import {DeviceReportCommService} from "../../service/device-report-comm.service";
import {DeviceReportCustomTimeComponent} from "../custom-timerange-dialog/device-report-custom-time.component";
import {EventLineChartComponent} from "../../../../../cutom-component/event-line-chart/event-line-chart.component";
import {DeviceReportService} from "../../../../../services/device-report.service";
import {DeviceService} from "../../../../../services/device.service";
import {EventService} from "../../../../../services/event.service";
import {EventData} from "../../../../../models/event-data";

@Component({
    selector: 'app-dashboard',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    selectedTab: Tabs;
    selectedName: string;

    timerange: any;
    from: number = 0;
    to: number = 0;
    selectedId: any;
    eventList: Array<EventData>;

    dataChange: ReplaySubject<any>;
    distance: number;
    totalEvents: number;

    @ViewChild(EventLineChartComponent)
    private chartComponent: EventLineChartComponent;


    constructor(private route: ActivatedRoute,
                private matDialog: MatDialog,
                private deviceService: DeviceService,
                private deviceReportCommService: DeviceReportCommService,
                private eventService: EventService,
                private deviceReportService: DeviceReportService,
                private applicationContext: ApplicationContext) { }

    ngOnInit() {
        // this.selectedId = this.route.snapshot.paramMap.get('deviceId');
        //const selIdN = selId ? parseInt(selId, 10) : 0;
        this.selectedTab = Tabs.SPEED_REPORT;
        this.dataChange = new ReplaySubject(1);

        this.timerange = '2';
        this.to = this.to ? this.to : (new Date()).getTime();
        this.from = this.from ? this.from : this.to - this.timerange * 60 * 60 * 1000;

        this.eventList = [];

        merge(this.dataChange)
            .pipe(
                startWith([]),
                switchMap(() => {
                    if (!this.selectedId) {
                        return observableOf([]);
                    }
                    return this.eventService!.getHistoryEvents(this.selectedId, this.from, this.to);
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
                this.selectedName = data[0] ? data[0].deviceName || data[0].deviceId : '';
                    this.distance = data[0] ? data[0].odometerKM - data[data.length - 1].odometerKM : 0;
                this.totalEvents = data.length;
            });

        this.route.params.pipe(map(p => p.deviceId)).subscribe(deviceId => {
            this.selectedId = deviceId;
            this.dataChange.next(1);
        });

    }

    timerangeChange() {
        console.log('Change time ...');
        if (this.timerange !== 'custom') {
            this.to = (new Date()).getTime();
            this.from = this.to - this.timerange * 60 * 60 * 1000;
            this.dataChange.next(1);
        } else {

        }
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
        this.deviceReportService.export(this.selectedId, this.from, this.to, type, fmt).subscribe(
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
        switch (event && event.index) {
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
