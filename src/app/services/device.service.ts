import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Device} from 'app/models/device';
import { AbstractService } from 'app/services/abstract.service';
import { DeviceRequest } from 'app/models/request/device.request';
import { Observable } from 'rxjs';
import { DeviceLittle } from 'app/models/little/device.little';

const API_DEVICE_PATH = '/api/device';

@Injectable()
export class DeviceService extends AbstractService<DeviceRequest, Device> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DEVICE_PATH);
    }

    getAllDevice(): Observable<Device[]> {
        const url = API_DEVICE_PATH + '/all';
        return this.http.get<Device[]>(url);
    }

    getAllStatus(): Observable<string[]> {
        const url = API_DEVICE_PATH + '/status';
        return this.http.get<string[]>(url);
    }
}
