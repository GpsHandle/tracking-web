import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {MailProperties} from "../../models/mail-properties";
import {ChangePasswdRequest} from "../../models/change-passwd.request";
import {AccountRequest} from "../../models/request/account.request";
import {AbstractService} from "./abstract.service";
import {Account} from "../../models/account";

export const ACCOUNT_API_URL = '/api/account';

@Injectable({
    providedIn: 'root'
})
export class AccountService extends AbstractService<AccountRequest, Account> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, ACCOUNT_API_URL);
    }

    getAllStatus(): Observable<string[]> {
        const url = ACCOUNT_API_URL + '/status';
        return this.http.get<string[]>(url);
    }

    changePassword(model: ChangePasswdRequest): Observable<void> {
        const url = ACCOUNT_API_URL + '/changePasswd';
        return this.http.put<void>(url, model);
    }

    createNewSmtp(accountId: number, aNewSmtpServer: MailProperties) {
        const url = ACCOUNT_API_URL + '/smtp/' + accountId ;
        return this.http.post<MailProperties>(url, aNewSmtpServer)
    }

    getAllSmtpServer(accountId?: number): Observable<Array<MailProperties>> {
        const url = accountId ? ACCOUNT_API_URL + '/smtp/' + accountId : ACCOUNT_API_URL + '/smtp';
        return this.http.get<Array<MailProperties>>(url);
    }
}
