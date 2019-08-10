import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { PageableCommonResponse } from 'app/models/pageable-common.response';
import { UnknownDevice } from 'app/models/unknown-device';
import { Device } from 'app/models/device';
import { DeviceRequest } from 'app/models/request/device.request';

export const UNKNOWN_DEVICE = '/api/unknowndevice';

@Injectable({
  providedIn: 'root'
})
export class UnknownDeviceService {

  constructor(private http: HttpClient) { }

    searchAndSort(page: number, size: number, sort: string, order: string): Observable<PageableCommonResponse<UnknownDevice>> {
        let params = new HttpParams();
        params = params.append('page', String(page));
        params = params.append('size', String(size));
        sort = sort ? sort : '';
        params = params.append('sort', sort + ',' + order);
        return this.http.get<PageableCommonResponse<UnknownDevice>>(UNKNOWN_DEVICE, {params: params});
    }

    addUknDevice(ukd: UnknownDevice): Observable<Device> {
        const url = '/api/device';
        const data = new DeviceRequest();
        data.deviceId = ukd.uniqueId;
        data.uniqueId = ukd.uniqueId;
        data.port = ukd.port;
        return this.http.post<Device>(url, data);
    }

    addAllUknDevice(): Observable<number> {
      const url = '/api/unknowndevice/all';
      return this.http.put<number>(url, '');
    }

  deleteAllUnknownDevice(): Observable<number> {
    const url = '/api/unknowndevice/all';
    return this.http.delete<number>(url);
  }

    deleteUknDevice(id: number): Observable<any> {
      const url = '/api/unknowndevice/' + id;
      return this.http.delete(url);
    }
    add(data: DeviceRequest): Observable<Device> {
        const url = '/api/device';
        return this.http.post<Device>(url, data);
    }

    addUnkDeviceList(param: {selections: number[]}) {
        const url = '/api/unknowndevice';
        return this.http.post<Device>(url, param);
    }
}
