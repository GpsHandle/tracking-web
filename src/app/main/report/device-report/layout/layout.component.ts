import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import {map, shareReplay, startWith, tap} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MainFacade} from '../../../../stores/root-store.facade';
import {DeviceLittle} from "../../../../models/little/device.little";
import {ApplicationContext} from "../../../../application-context";
import {DeviceReportCommService} from "../service/device-report-comm.service";
import {Device} from "../../../../models/device";
import {DeviceService} from "../../../../services/device.service";
import {DashboardService} from "../service/dashboard.service";

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
    from = 0;
    to = 0;
    sidenavOpened$: Observable<boolean>;
    sidenavMode$: Observable<string>;
    @ViewChild(MatDrawer, { static: true }) sideNav: MatDrawer;
    constructor( private breakpointObserver: BreakpointObserver,
        private deviceService: DeviceService,
        private mainFacade: MainFacade,
        private dashboardService: DashboardService,
        private deviceReportCommService: DeviceReportCommService,
        private applicationContext: ApplicationContext) {
        this.sidenavMode$ = this.mainFacade.sidenavMode$;
        this.sidenavOpened$ = this.mainFacade.sidenavOpened$;
    }

    ngOnInit() {
        this.deviceService.getAllDevice().pipe(
            startWith([]),
            map(value => {
                return value;
            }),
            tap((d) => {
                this.dashboardService.cacheDevices(d);
            })
        ).subscribe(
            (devices: Device[] ) => {
                this.deviceList = devices;
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

