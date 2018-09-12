import { AccountLittle } from 'app/models/little/account.little';

export class GeoJsonInf {
    geometry: any;
    properties: any;
    type: string;

    constructor() {
        this.geometry = {};
        this.properties = {};
    }
}

export class Geozone {
    private _id: number;
    private _companyId: number;
    private _accounts: Array<AccountLittle>;
    private _name: string;
    private _color: string;
    private _address: string;
    private _maxSpeedKPH: number;
    private _reverseGeozone: boolean;
    private _privateArea: boolean;
    private _geojson: GeoJsonInf;

    constructor() {
        this.geojson = new GeoJsonInf();
    }

    private _internalId: number;


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get companyId(): number {
        return this._companyId;
    }

    set companyId(value: number) {
        this._companyId = value;
    }

    get accounts(): Array<AccountLittle> {
        return this._accounts;
    }

    set accounts(value: Array<AccountLittle>) {
        this._accounts = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get maxSpeedKPH(): number {
        return this._maxSpeedKPH;
    }

    set maxSpeedKPH(value: number) {
        this._maxSpeedKPH = value;
    }

    get reverseGeozone(): boolean {
        return this._reverseGeozone;
    }

    set reverseGeozone(value: boolean) {
        this._reverseGeozone = value;
    }

    get privateArea(): boolean {
        return this._privateArea;
    }

    set privateArea(value: boolean) {
        this._privateArea = value;
    }

    get geojson(): string | any {
        return this._geojson;
    }

    set geojson(value: string | any) {
        this._geojson = value;
    }

    get internalId(): number {
        return this._internalId;
    }

    set internalId(value: number) {
        this._internalId = value;
    }
}
