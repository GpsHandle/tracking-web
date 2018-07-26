import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { PageableResponse } from 'app/models/pageable-response';
import { DeviceSpeeedReport } from 'app/models/device-speeed-report';
import { DeviceParkingReport } from 'app/models/device-parking-report';

const API_REPORT_DEVICE_PATH = '/api/r/device';

@Injectable({
    providedIn: 'root'
})

export class DeviceReportService {
    constructor(private http: HttpClient) {

    }

    getSpeedReport(device: number, from: number, to: number, page: number, size: number, sort: string, order: string): Observable<PageableResponse<DeviceSpeeedReport>> {

        let url = API_REPORT_DEVICE_PATH + "/speed/" + device;

        let params = new HttpParams();
        params = params.append('from', String(from));
        params = params.append('to', String(to));
        params = params.append('page', String(page));
        params = params.append('size', String(size));
        sort = sort ? sort : '';
        order = order ? order : '';
        params = params.append('sort', sort + ',' + order);
        return this.http.get<PageableResponse<DeviceSpeeedReport>>(url, {params: params});
    }

    getParkingReport(device: number, from: number, to: number): Observable<DeviceParkingReport> {
        let url = API_REPORT_DEVICE_PATH + "/parking/" + device;

        let params = new HttpParams();
        params = params.append('from', String(from));
        params = params.append('to', String(to));
        return this.http.get<DeviceParkingReport>(url, {params: params});
    }
}
