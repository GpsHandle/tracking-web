import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Device} from "../models/device";
import {DeviceRequest} from "../models/request/device.request";
import {AbstractService} from "./abstract.service";
const API_DEVICE_PATH = '/api/device';

@Injectable({
    providedIn: 'root'
})

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

    sendCommand(id: number, cmdStr: string) {
        const url = API_DEVICE_PATH + '/' + id + '/cmd';
        return this.http.post(url, cmdStr);
    }

    toggleAlertProfile(params: any): Observable<any> {
        const url = API_DEVICE_PATH + '/toggle-alert';
        return this.http.post(url, params);
    }
}
