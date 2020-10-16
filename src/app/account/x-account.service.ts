import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../models/account";
import {AccountRequest} from "../models/request/account.request";

@Injectable({
  providedIn: 'root'
})
export class XAccountService {
  private readonly url: string = '/api';
  constructor(private http: HttpClient) {
  }

  register(request: AccountRequest): Observable<Account>{
    return this.http.post<Account>(this.url + '/register', request);
  }

  activate(xKey: string): Observable<any> {
    return this.http.get(this.url + '/activate', {params: { key: xKey}})
  }
}
