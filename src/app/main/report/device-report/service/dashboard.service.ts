import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Device } from 'app/models/device';
import { filter } from 'rxjs/operators';

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
