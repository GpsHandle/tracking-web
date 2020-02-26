import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceLittle } from 'app/models/little/device.little';
import { MatDrawer } from '@angular/material/sidenav';
import { DeviceService } from 'app/services/device.service';
import { ApplicationContext } from 'app/application-context';
import { Observable } from 'rxjs';
import {map, shareReplay, startWith} from 'rxjs/operators';

import { DeviceReportCommService } from 'app/main/report/device-report/service/device-report-comm.service';
import { Device } from 'app/models/device';
import { DashboardService } from 'app/main/report/device-report/service/dashboard.service';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
    selector: 'app-report',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    deviceList: Device[];
    selected: DeviceLittle | any;
    from: number = 0;
    to: number = 0;

    @ViewChild(MatDrawer, { static: true }) sideNav: MatDrawer;
    constructor( private breakpointObserver: BreakpointObserver,
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

