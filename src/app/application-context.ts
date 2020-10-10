import {
    ApplicationRef,
    ComponentFactoryResolver,
    Inject,
    Injectable,
    Injector,
    OnDestroy,
    OnInit, PLATFORM_ID
} from '@angular/core';
import {ComponentPortal, DomPortalHost, DomPortalOutlet} from "@angular/cdk/portal";
import {SpinnerComponent} from "./pages/spinner/spinner.component";
import {Privilege} from "./models/privilege";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {NavigationExtras, Router} from "@angular/router";
import {UniversalStorage} from "./shared/universal-storage.service";
import {AuthResponse} from "./models/auth.response";
import {HttpErrorResponse} from "@angular/common/http";
import {isPlatformBrowser} from "@angular/common";

export const redirectUrl = 'redirectUrl';
const DEFAULT_REDIRECT_URL = '/main/tracking';

@Injectable()
export class ApplicationContext implements OnInit, OnDestroy {

    private readonly holderPortal: ComponentPortal<SpinnerComponent>;
    // private bodyPortal: DomPortalHost;
    private bodyPortal: DomPortalOutlet;

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
    private _scope: string;
    private _token_type: string;
    private _firstPageUrl: string;
    private _lang: string;
    //------------------------------------------------------------------------------------------------------------------
    //~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~
    //------------------------------------------------------------------------------------------------------------------
    private all_privilege: Array<Privilege> = [
        {id: 0, name: "ANONYMOUS"},
        {id: 1, name: "NORMAL_USER"},
        {id: 2, name: "MODERATOR"},
        {id: 3, name: "ADMIN"},
        {id: 4, name: "SYSADMIN"},
        {id: 5, name: "SUPER"}
    ];

    statusList: Array<string> = [
        'UNKNOWN',
        'DELETED',
        'PENDING',
        'INACTIVATED',
        'ACTIVATED'
    ];

    private portalMap = new Map<string, DomPortalHost>();
    //------------------------------------------------------------------------------------------------------------------
    //~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~//~~
    //------------------------------------------------------------------------------------------------------------------

    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private myStorage: UniversalStorage,
                private factoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector, @Inject(PLATFORM_ID) private platformId: any) {

        this.populate();

        if (isPlatformBrowser(platformId)) {
            this.holderPortal = new ComponentPortal<SpinnerComponent>(SpinnerComponent);
            this.bodyPortal = new DomPortalOutlet(
                document.body,
                this.factoryResolver,
                this.appRef,
                this.injector
            )
        }
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
        }, 0);
    }

    spinAt(id: string, shouldShow?: boolean,) {
        if (isPlatformBrowser(this.platformId)) {
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
            }, 0);
        }
    }

    store(result?: AuthResponse): void {
        if (result) {
            this.access_token       = result.access_token;
            this.accountId          = result.accountId;
            this.lang               = result.lang;
            this.accountName        = result.accountName;
            this.authorities        = result.authorities;
            this.expires_in         = result.expires_in;
            this.jti                = result.jti;
            this.scope              = result.scope;
            this.token_type         = result.token_type;
            this.firstPageUrl       = result.firstPageUrl;
        }

        this.myStorage.setItem('ACCESS_TOKEN', this.access_token);
        this.myStorage.setItem('ACCOUNT_ID', String(this.accountId));
        this.myStorage.setItem('LANG', String(this.lang));
        this.myStorage.setItem('ACCOUNT_NAME', this.accountName);
        this.myStorage.setItem('AUTHORITIES', JSON.stringify(this.authorities));
        this.myStorage.setItem('EXPIRES_IN', String(this.expires_in));
        this.myStorage.setItem('JTI', String(this.jti));
        this.myStorage.setItem('SCOPE', this.scope);
        this.myStorage.setItem('TOKEN_TYPE', this.token_type);
        this.myStorage.setItem('FIRST_PAGE_URL', this.firstPageUrl);

        this.myStorage.setItem(redirectUrl, this.redirectURL);
    }

    populate(): void {
        try {
            this.access_token       = this.myStorage.getItem('ACCESS_TOKEN');
            this.accountId          = parseInt(this.myStorage.getItem('ACCOUNT_ID'), 10);
            this.lang               = this.myStorage.getItem('LANG');
            this.accountName        = this.myStorage.getItem('ACCOUNT_NAME');
            try {
                this.authorities        = JSON.parse(this.myStorage.getItem('AUTHORITIES'));
            } catch (e) {
                // no authorities
            }

            this.expires_in         = parseInt(this.myStorage.getItem('EXPIRES_IN'), 10);
            this.jti                = this.myStorage.getItem('JTI');
            this.scope              = this.myStorage.getItem('SCOPE');
            this.token_type         = this.myStorage.getItem('TOKEN_TYPE');
            this.firstPageUrl       = this.myStorage.getItem('FIRST_PAGE_URL');

            this.redirectURL = this.myStorage.getItem(redirectUrl);
        } catch (e) {
            // console.log(e);
        }

    }

    clear(): void {
        this.myStorage.clearAll();
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

    getAccountId(): number {
        return this.accountId;
    }

    getLang(): string {
        return this.lang ? this.lang : 'en';
    }

    //------------------------------------------------------------------------------------------------------------------
    //~~
    //------------------------------------------------------------------------------------------------------------------
    logout() {
        this.redirectURL = '';
        this.clear();
        this.access_token       = null;
        this.accountId          = null;
        this.accountName        = null;
        this.authorities        = null;
        this.expires_in         = null;
        this.jti                = null;
        this.scope              = null;
        this.token_type         = null;
        this.firstPageUrl       = null;
    }

    navigate(commands: any[], extras?: NavigationExtras) {
        return this.router.navigate(commands, extras);
    }

    isLoggedIn(): boolean {
        return !!this.access_token;
    }



    ngOnDestroy(): void {
        this.store()

    }

    //------------------------------------------------------------------------------------------------------------------
    //-- toast
    //------------------------------------------------------------------------------------------------------------------
    info(message: string): void {
        const config = ApplicationContext._createConfig(false);
        this.snackBar.open(message, null, config);
    }

    error(message: string | HttpErrorResponse): void {
        const config = ApplicationContext._createConfig(true);

        if (message instanceof HttpErrorResponse) {
            this.snackBar.open(message.error.message || message.message, null, config);
        } else {
            this.snackBar.open(message, null, config);
        }
    }

    private static _createConfig(isError?: boolean) {
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

    get lang(): string {
        return this._lang;
    }

    set lang(value: string) {
        this._lang = value;
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

export enum AccountStatus {
    UNKNOWN,
    DELETED,
    PENDING,
    INACTIVATED,
    ACTIVATED
}
