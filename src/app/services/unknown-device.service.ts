import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageableCommonResponse } from 'app/models/pageable-common.response';
import { UnknownDevice } from 'app/models/unknown-device';

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
}
