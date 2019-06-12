import { Injectable } from '@angular/core';
import {Account} from 'app/models/account';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { AbstractService } from 'app/services/abstract.service';
import { AccountRequest } from 'app/models/request/account.request';
import { Observable } from 'rxjs';

export const ACCOUNT_API_URL = '/api/account';

@Injectable()
export class AccountService extends AbstractService<AccountRequest, Account> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, ACCOUNT_API_URL);
    }

    getAllStatus(): Observable<string[]> {
        const url = ACCOUNT_API_URL + '/status';
        return this.http.get<string[]>(url);
    }
}
