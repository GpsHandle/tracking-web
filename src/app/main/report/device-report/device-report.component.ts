import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceLittle } from 'app/models/little/device.little';
import { MatDrawer, MatSidenav, MatTableDataSource } from '@angular/material';
import { DeviceService } from 'app/services/device.service';
import { ApplicationContext } from 'app/application-context';
import { DeviceReportService } from 'app/services/device-report.service';

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


    @ViewChild(MatDrawer) sideNav: MatDrawer;

    constructor(private deviceService: DeviceService,
                private deviceReportService: DeviceReportService,
                private applicationContext: ApplicationContext) { }

    ngOnInit() {
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
            }
        );
    }


    applyFilter(filterValue: string) {
        // filterValue = filterValue.trim(); // Remove whitespace
        // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        // this.deviceTableDataSource.filter = filterValue;
    }


    selectThisDevice(device: DeviceLittle): void {
        console.log('Device: ', device);
        this.selected = device;
        // if (this.oldSelectedDevice) {
        //     this.oldSelectedDevice.selected = false;
        // }
        // device.selected = !device.selected;
        //
        // let evdt = _.find(this.liveEvents, function (e) {
        //     return device.id === e.devId;
        // });
        // let center = L.latLng(evdt.latitude, evdt.longitude);
        // this.map.setView(center, 15);
        //
        // this.oldSelectedDevice = device;
    }

    tonggleSidebar(e: any) {
        e.stopPropagation();
        this.sideNav.toggle();
        this.tIcon = this.sideNav.opened ? 'back' : 'sub-menu';
    }

    last2hours(): void {
        this.to = Date.now();
        this.from = this.to - 2 * 3600 * 1000;
    }

    last8hours(): void {
        this.to = Date.now();
        this.from = this.to - 8 * 3600 * 1000;
    }

    last24hours(): void {
        this.to = Date.now();
        this.from = this.to - 24 * 3600 * 1000;
    }

    last72hours(): void {
        this.to = Date.now();
        this.from = this.to - 72 * 3600 * 1000;
    }

    //----------export----------//
    exportPdf() {


        this.deviceReportService.exportSpeedReport(this.selected.id, this.from, this.to).subscribe(
            data => {
                console.log('Data', data);
            },
            error => {},
            () => {}
        );
    }
}
