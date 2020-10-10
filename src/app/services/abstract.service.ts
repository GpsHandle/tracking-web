import { Observable, of } from 'rxjs';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {PageableCommonResponse} from "../models/pageable-common.response";

export class AbstractService<I, O> {

    private readonly _url: string;

    private _http: HttpClient;
    private _router: Router;

    constructor(http: HttpClient, router: Router, url: string) {
        this._router = router;
        this._url = url;
        this._http = http;
    }

    searchAndSort(page: number, size: number, sort: string, order: string): Observable<PageableCommonResponse<O>> {
        let params = new HttpParams();
        params = params.append('page', String(page));
        params = params.append('size', String(size));
        sort = sort ? sort : '';
        params = params.append('sort', sort + ',' + order);
        return this._http.get<PageableCommonResponse<O>>(this._url, {params: params});
    }

    getAll(): Observable<O[]> {
        const url = this._url + '/all';
        return this._http.get<O[]>(url);
    }

    getById(id: number): Observable<O> {
        const url = this._url + '/' + id;
        return this._http.get<O>(url);
    }

    _delete(id: number): Observable<number> {
        const url = this._url + '/' + id;
        return this._http.delete<any>(url);
    }

    update(id: number, data: I): Observable<O> {
        const url = this._url + '/' + id;
        return this._http.put<O>(url, data);
    }

    update2(id: number, data: I): Observable<O> {
        const url = this._url + '/' + id;
        return this._http.patch<O>(url, data);
    }

    create(data: I): Observable<O> {
        const url = this._url;
        return this._http.post<O>(url, data);
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
            return of(errMsg);//Observable.throw(errMsg);
        }
    }
}
