import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {Device} from "../../../../models/device";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    private deviceList: Subject<Device[]> = new BehaviorSubject([]);

    get deviceList$() {
        return this.deviceList.asObservable().pipe(filter(deviceList => !!deviceList));
    }

    cacheDevices(devices: Device[]) {
        this.deviceList.next(devices);
    }
}
