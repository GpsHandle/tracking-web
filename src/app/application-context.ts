import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, OnDestroy, OnInit } from '@angular/core';
import {AuthResponse} from 'app/models/auth.response';
import * as jwt from 'jwt-decode';
import 'rxjs/add/operator/distinctUntilChanged';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Privilege } from 'app/models/privilege';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { SpinnerComponent } from 'app/pages/spinner/spinner.component';

import * as _ from 'lodash';
import { NavigationExtras } from '@angular/router/src/router';

export const redirectUrl = 'redirectUrl';
const DEFAULT_REDIRECT_URL = '/main/tracking';

@Injectable()
export class ApplicationContext implements OnInit, OnDestroy {

    private readonly holderPortal: ComponentPortal<SpinnerComponent>;
    private bodyPortal: DomPortalHost;

    //------------------------------------------------------------------------------------------------------------------
    //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
    //------------------------------------------------------------------------------------------------------------------
    private _redirectURL: string;
    private _access_token: string;
    private _accountId: number;
    private _accountName: string;
    private _authorities: Array<string>;
    private _expires_in: number;
    private _jti: string;
    private _companyId: number;
    private _organizationName: string;
    private _scope: string;
    private _token_type: string;
    private _firstPageUrl: string;
    //------------------------------------------------------------------------------------------------------------------
    //~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~
    //------------------------------------------------------------------------------------------------------------------
    private all_privilege: Array<Privilege> = [
        {id: 0, name: "ANONYMOUS"},
        {id: 1, name: "NORMAL_USER"},
        {id: 2, name: "MODERATOR"},
        {id: 3, name: "ADMIN"},
        {id: 4, name: "SYSADMIN"},
        {id: 5, name: "VD5LORD"}
    ];

    statusList: Array<string> = [
        'UNKNOWN',
        'DELETED',
        'PENDING',
        'INACTIVATED',
        'ACTIVATED'
    ];

    pageUrlList: Array<string> = [
        '/main/tracking',
        '/main/report',
        '/main/_admin/_account',
        '/main/_admin/_company',

    ];

    private portalMap = new Map<string, DomPortalHost>();
    //------------------------------------------------------------------------------------------------------------------
    //~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~
    //------------------------------------------------------------------------------------------------------------------

    constructor(private snackBar: MatSnackBar, private router: Router,
                private factoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {

        this.populate();

        this.holderPortal = new ComponentPortal<SpinnerComponent>(SpinnerComponent);
        this.bodyPortal = new DomPortalHost(
            document.body,
            this.factoryResolver,
            this.appRef,
            this.injector
        )
    }

    ngOnInit(): void {

    }

    spin(shouldShow?: boolean) {
        setTimeout(() => {
            if (shouldShow && !this.bodyPortal.hasAttached()) {
                this.bodyPortal.attach(this.holderPortal);
            } else {
                this.bodyPortal.detach();
            }
        }, 1);
    }

    spinAt(id: string, shouldShow?: boolean,) {
        let elPortal = this.portalMap.get(id);
        if (!elPortal || !elPortal.hasAttached()) {
            elPortal = new DomPortalHost(
                document.getElementById(id),
                this.factoryResolver,
                this.appRef,
                this.injector
            );
            this.portalMap.set(id, elPortal);
        }

        const holderPortal = this.holderPortal;
        setTimeout(function () {
            if (shouldShow && !elPortal.hasAttached()) {
                elPortal.attach(holderPortal);
            } else {
                elPortal.detach();
            }
        });
    }

    store(result?: AuthResponse): void {
        if (result) {
            this.access_token       = result.access_token;
            this.accountId          = result.accountId;
            this.accountName        = result.accountName;
            this.authorities        = result.authorities;
            this.expires_in         = result.expires_in;
            this.jti                = result.jti;
            this.companyId          = result.companyId;
            this.organizationName   = result.organizationName;
            this.scope              = result.scope;
            this.token_type         = result.token_type;
            this.firstPageUrl       = result.firstPageUrl;
        }

        localStorage.setItem('ACCESS_TOKEN', this.access_token);
        localStorage.setItem('ACCOUNT_ID', String(this.accountId));
        localStorage.setItem('ACCOUNT_NAME', this.accountName);
        localStorage.setItem('AUTHORITIES', JSON.stringify(this.authorities));
        localStorage.setItem('EXPIRES_IN', String(this.expires_in));
        localStorage.setItem('JTI', String(this.jti));
        localStorage.setItem('COMPANY_ID', String(this.companyId));
        localStorage.setItem('ORGANIZATION_NAME', this.organizationName);
        localStorage.setItem('SCOPE', this.scope);
        localStorage.setItem('TOKEN_TYPE', this.token_type);
        localStorage.setItem('FIRST_PAGE_URL', this.firstPageUrl);

        localStorage.setItem(redirectUrl, this.redirectURL);
    }

    populate(): void {
        try {
            this.access_token       = localStorage.getItem('ACCESS_TOKEN');
            this.accountId          = parseInt(localStorage.getItem('ACCOUNT_ID'), 10);
            this.accountName        = localStorage.getItem('ACCOUNT_NAME');
            this.authorities        = JSON.parse(localStorage.getItem('AUTHORITIES'));
            this.expires_in         = parseInt(localStorage.getItem('EXPIRES_IN'), 10);
            this.jti                = localStorage.getItem('JTI');
            this.companyId          = parseInt(localStorage.getItem('COMPANY_ID'), 10);
            this.organizationName   = localStorage.getItem('ORGANIZATION_NAME');
            this.scope              = localStorage.getItem('SCOPE');
            this.token_type         = localStorage.getItem('TOKEN_TYPE');
            this.firstPageUrl       = localStorage.getItem('FIRST_PAGE_URL');

            this.redirectURL = localStorage.getItem(redirectUrl);
        } catch (e) {
            console.log(e);
        }

    }

    clear(): void {
        this.access_token       = null;
        this.accountId          = null;
        this.accountName        = null;
        this.authorities        = null;
        this.expires_in         = null;
        this.jti                = null;
        this.companyId          = null;
        this.organizationName   = null;
        this.scope              = null;
        this.token_type         = null;
        this.firstPageUrl       = null;

        localStorage.setItem('ACCESS_TOKEN', this.access_token);
        localStorage.setItem('ACCOUNT_ID', String(this.accountId));
        localStorage.setItem('ACCOUNT_NAME', this.accountName);
        localStorage.setItem('AUTHORITIES', JSON.stringify(this.authorities));
        localStorage.setItem('EXPIRES_IN', String(this.expires_in));
        localStorage.setItem('JTI', String(this.jti));
        localStorage.setItem('COMPANY_ID', String(this.companyId));
        localStorage.setItem('ORGANIZATION_NAME', this.organizationName);
        localStorage.setItem('SCOPE', this.scope);
        localStorage.setItem('TOKEN_TYPE', this.token_type);
        localStorage.setItem('FIRST_PAGE_URL', this.firstPageUrl);
    }

    getRedirectURL() {
        return (this.redirectURL && this.redirectURL !== 'null') ? this.redirectURL : this.firstPageUrl;
    }

    getToken(): string {
        return this.token_type + " " + this.access_token;
    }

    getPrivileges(): Array<Privilege> {
        const max = this.authorities[0]; //only 1 authority
        let rtn: Array<Privilege> = [];
        for (let i = 0; i < this.all_privilege.length; i++) {
            if (this.all_privilege[i].name !== max) {
                rtn.push(this.all_privilege[i]);
            } else {
                rtn.push(this.all_privilege[i]);
                break;
            }
        }
        return rtn;
    }

    //------------------------------------------------------------------------------------------------------------------
    //~~
    //------------------------------------------------------------------------------------------------------------------
    logout() {
        this.redirectURL = '';
        this.clear();
    }

    navigate(commands: any[], extras?: NavigationExtras) {
        return this.router.navigate(commands, extras);
    }

    isLoggedIn(): boolean {
        try {
            const decoded: any = jwt(this._access_token);
            return decoded.exp > Date.now()/1000;
        } catch (e) {
            return false;
        }
    }

    ngOnDestroy(): void {
        this.store()

    }

    //------------------------------------------------------------------------------------------------------------------
    //-- toast
    //------------------------------------------------------------------------------------------------------------------
    info(message: string): void {
        const config = this._createConfig(false);
        this.snackBar.open(message, null, config);
    }

    error(message: string | HttpErrorResponse): void {
        const config = this._createConfig(true);

        if (message instanceof HttpErrorResponse) {
            this.snackBar.open(message.error.error_description || message.message, null, config);
        } else {
            this.snackBar.open(message, null, config);
        }
    }

    private _createConfig(isError?: boolean) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'right';
        config.duration = 3000;
        if (isError) {
            config.panelClass = ['toast-warn'];
        } else {
            config.panelClass = ['toast-info'];
        }
        return config;
    }

    //------------------------------------------------------------------------------------------------------------------
    //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
    //------------------------------------------------------------------------------------------------------------------

    get firstPageUrl(): string {
        return (this._firstPageUrl && this._firstPageUrl!=='null') ? this._firstPageUrl : DEFAULT_REDIRECT_URL;
    }

    set firstPageUrl(value: string) {
        this._firstPageUrl = value;
    }

    get redirectURL(): string {
        return this._redirectURL; //? this._redirectURL : this.firstPageUrl;
    }

    set redirectURL(value: string) {
        this._redirectURL = value;
    }

    get access_token(): string {
        return this._access_token;
    }

    set access_token(value: string) {
        this._access_token = value;
    }

    get accountId(): number {
        return this._accountId;
    }

    set accountId(value: number) {
        this._accountId = value;
    }

    get accountName(): string {
        return this._accountName;
    }

    set accountName(value: string) {
        this._accountName = value;
    }

    get authorities(): Array<string> {
        return this._authorities;
    }

    set authorities(value: Array<string>) {
        this._authorities = value;
    }

    get expires_in(): number {
        return this._expires_in;
    }

    set expires_in(value: number) {
        this._expires_in = value;
    }

    get jti(): string {
        return this._jti;
    }

    set jti(value: string) {
        this._jti = value;
    }

    get companyId(): number {
        return this._companyId;
    }

    set companyId(value: number) {
        this._companyId = value;
    }

    get organizationName(): string {
        return this._organizationName;
    }

    set organizationName(value: string) {
        this._organizationName = value;
    }

    get scope(): string {
        return this._scope;
    }

    set scope(value: string) {
        this._scope = value;
    }

    get token_type(): string {
        return this._token_type;
    }

    set token_type(value: string) {
        this._token_type = value;
    }
}
