export class LoginResponse {
    private _access_token: string;
    private _accountId: number;
    private _accountName: string;
    private _authorities: string[];
    private _expires_in: number;
    private _jti: string;
    private _organizationId: number;
    private _organizationName: string;
    private _scope: string;
    private _token_type: string;


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

    get authorities(): string[] {
        return this._authorities;
    }

    set authorities(value: string[]) {
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

    get organizationId(): number {
        return this._organizationId;
    }

    set organizationId(value: number) {
        this._organizationId = value;
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
