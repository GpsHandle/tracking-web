import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { PageableCommonResponse } from 'app/models/pageable-common.response';
import { DeviceSpeeedReport } from 'app/models/device-speeed.report';
import { DeviceParkingReport } from 'app/models/device-parking.report';
import { AlertEventLog } from 'app/models/alert-event-log';

const API_REPORT_DEVICE_PATH = '/api/r/device';
const API_REPORT_ALERT_PATH = '/api/alert/r/';

@Injectable({
    providedIn: 'root'
})

export class DeviceReportService {
    constructor(private http: HttpClient) {

    }

    getSpeedReport(device: number, from: number, to: number, page: number, size: number, sort: string, order: string): Observable<PageableCommonResponse<DeviceSpeeedReport>> {

        let url = API_REPORT_DEVICE_PATH + "/speed/" + device;

        let params = new HttpParams();
        params = params.append('from', String(from));
        params = params.append('to', String(to));
        params = params.append('page', String(page));
        params = params.append('size', String(size));
        sort = sort ? sort : '';
        order = order ? order : '';
        params = params.append('sort', sort + ',' + order);
        return this.http.get<PageableCommonResponse<DeviceSpeeedReport>>(url, {params: params});
    }

    getParkingReport(device: number, from: number, to: number): Observable<DeviceParkingReport[]> {
        let url = API_REPORT_DEVICE_PATH + "/parking/" + device;

        let params = new HttpParams();
        params = params.append('from', String(from));
        params = params.append('to', String(to));
        return this.http.get<DeviceParkingReport[]>(url, {params: params});
    }

    getAlertLogs(device: number, from: number, to: number, page: number, size: number, sort: string, order: string): Observable<PageableCommonResponse<AlertEventLog>> {
        let url = API_REPORT_ALERT_PATH + device;

        let params = new HttpParams();
        params = params.append('from', String(from));
        params = params.append('to', String(to));
        params = params.append('page', String(page));
        params = params.append('size', String(size));
        sort = sort ? sort : '';
        order = order ? order : '';
        params = params.append('sort', sort + ',' + order);
        return this.http.get<PageableCommonResponse<AlertEventLog>>(url, {params: params});
    }

    export(device: number, from: number, to: number, type?: string, fmt?: string): Observable<HttpResponse<Blob>> {
        type = type ? type : 'speed';
        let url = API_REPORT_DEVICE_PATH + "/exp/" + type + "/" + device;
        let params = new HttpParams();
        params = params.append('from', String(from));
        params = params.append('to', String(to));
        if (fmt) {
            params = params.append('format', fmt);
        }

        let headers = new HttpHeaders({
            'Accept': 'text/html, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        return this.http.get<HttpResponse<Blob>>(url, {
            headers: headers,
            params: params,
            responseType: 'blob' as 'json'
        });
    }
}
