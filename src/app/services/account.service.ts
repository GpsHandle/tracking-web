import { Injectable } from '@angular/core';
import {Account} from 'app/models/account';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { AbstractService } from 'app/services/abstract.service';
import { AccountRequest } from 'app/models/request/account.request';
import { Observable } from 'rxjs';
import {SmtpProperties} from "../models/smtp-properties";

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

    createNewSmtp(accountId: number, aNewSmtpServer: SmtpProperties) {
        const url = ACCOUNT_API_URL + '/smtp/' + accountId ;
        return this.http.post<SmtpProperties>(url, aNewSmtpServer)
    }

    getAllSmtpServer(accountId?: number): Observable<Array<SmtpProperties>> {
        const url = accountId ? ACCOUNT_API_URL + '/smtp/' + accountId : ACCOUNT_API_URL + '/smtp';
        return this.http.get<Array<SmtpProperties>>(url);
    }
}
