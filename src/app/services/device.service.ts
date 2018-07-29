import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Device} from 'app/models/device';
import { Base2Service } from 'app/services/base2.service';
import { RequestDevice } from 'app/models/request/request-device';
import { Observable } from 'rxjs/Rx';
import { DeviceLittle } from 'app/models/little/device-little';

const API_DEVICE_PATH = '/api/device';

@Injectable()
export class DeviceService extends Base2Service<RequestDevice, Device> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DEVICE_PATH);
    }

    getAllLittle(): Observable<DeviceLittle[]> {
        const url = API_DEVICE_PATH + '/all';
        return this.http.get<DeviceLittle[]>(url);
    }

    getAllStatus(): Observable<string[]> {
        const url = API_DEVICE_PATH + '/status';
        return this.http.get<string[]>(url);
    }
}