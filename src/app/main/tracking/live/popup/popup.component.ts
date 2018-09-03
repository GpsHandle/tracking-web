import { AfterViewInit, Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');
@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterViewInit {

    constructor(@Inject(CONTAINER_DATA) public data: any, private _datePipe: DatePipe) { }

    ngOnInit() {
        console.log('Data', this.data);

    }

    ngAfterViewInit(): void {
        this.data.marker.togglePopup();
    }

    get deviceId(): string {
        return this.data.event ? this.data.event.deviceId : '-';
    }

    get status(): string {
        return this.data.event ? this.data.event.status : '-';
    }

    get speedKph(): string {
        return this.data.event ? this.data.event.speedKPH : 0;
    }

    get timestamp(): string {
        if (this.data.event) {
            return this._datePipe.transform(this.data.event.timestamp, 'MMM dd, yyyy hh:mm:ss');
        } else {
            return '';
        }
    }

    get latlng(): string {
        return this.data.event ? this.data.event.latitude + '/' + this.data.event.longitude : '0.0/0.0';
    }

    get address(): string {
        return this.data.event ? this.data.event.address : '';
    }

    get devId(): string {
        return this.data.event ? this.data.event.devId : 0;
    }
}

