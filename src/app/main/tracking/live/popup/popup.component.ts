import {AfterViewInit, Component, Inject, InjectionToken, OnDestroy, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Device } from 'app/models/device';
export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');
@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterViewInit, OnDestroy {
    private dev : Device;

    constructor(@Inject(CONTAINER_DATA) public data: any, private _datePipe: DatePipe) { }

    ngOnInit() {
        // console.log('Data', this.data);
        this.dev = this.data.event;

    }

    ngAfterViewInit(): void {
        console.log('AfterViewInit ~ Popup.component');
        this.data.marker.openPopup();
    }

    get deviceId(): string {
        return this.dev ? this.dev.deviceId : '-';
    }

    get status(): string {
        return this.dev ? this.dev.status : '-';
    }

    get speedKph(): number {
        return this.dev ? this.dev.lastSpeedKph : 0;
    }

    get timestamp(): string {
        if (this.dev) {
            return this._datePipe.transform(this.dev.lastEventTime, 'MMM dd, yyyy hh:mm:ss');
        } else {
            return '';
        }
    }

    get latlng(): string {
        return this.dev ? this.dev.lastLatitude + '/' + this.dev.lastLongitude : '0.0/0.0';
    }

    get address(): string {
        return this.dev ? this.dev.lastAddress : '';
    }

    get stayedTimeInWords(): string {
        return this.dev ? this.dev.stayedTimeInWords : '';
    }

    get devId(): number {
        return this.dev ? this.dev.id : 0;
    }

    ngOnDestroy(): void {
        console.log('Destroy ...');
        if (this.data && this.data.marker) {
            this.data.marker.closePopup();
        }
    }
}

