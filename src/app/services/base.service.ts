import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {PageableCommonResponse} from "../models/pageable-common.response";

export class BaseService<T> {
    private _http: HttpClient;
    private _url: string;
    private _router: Router;

    constructor(http: HttpClient, router: Router, url: string) {
        this._router = router;
        this._url = url;
        this._http = http;
    }

    searchAndSort(page: number, size: number, sort: string, order: string): Observable<PageableCommonResponse<T>> {
        let params = new HttpParams();
        params.append('page', String(page));
        params.append('size', String(size));
        params.append('sort', sort + ',' + order);
        return this._http.get<PageableCommonResponse<T>>(this._url, {params: params});
    }

    getAll(): Observable<T[]> {
        const url = this._url + '/all';
        return this._http.get<T[]>(url);
    }

    getById(id: number): Observable<T> {
        const url = this._url + '/' + id;
        return this._http.get<T>(url);
    }

    _delete(id: number): Observable<number> {
        const url = this._url + '/' + id;
        return this._http.delete<any>(url);
    }

    update(id: number, data: T): Observable<T> {
        const url = this._url + '/' + id;
        return this._http.put<T>(url, data);
    }

    update2(id: number, data: T): Observable<T> {
        const url = this._url + '/' + id;
        return this._http.patch<T>(url, data);
    }

    create(data: T): Observable<T> {
        const url = this._url;
        return this._http.post<T>(url, data);
    }

    error(error: HttpErrorResponse | any): Observable<any> {
        console.log("Error", error);
        if (error) {
            this._router.navigate(['/login']);
        } else {
            let errMsg: string;
            if (error instanceof HttpErrorResponse) {
                const err = error.message || JSON.stringify(error);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }
            return Observable.throw(errMsg);
        }
    }
}
