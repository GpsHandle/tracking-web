import { CompanyLittle } from 'app/models/little/company.little';
import { Role } from 'app/models/role';

export class Account {
    private _id: number;
    private _accountId: string;
    private _firstName: string;
    private _lastName: string;
    private _status: any;
    private _privilege: Role;
    private _company: CompanyLittle | any;
    private _phoneNumber: string;
    private _photoUrl: string;
    private _emailAddress: string;
    private _addressLine1: string;
    private _addressLine2: string;
    private _notes: string;
    private _createdBy: string;
    private _updatedBy: string;
    private _createdOn: Date;
    private _updatedOn: Date;


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get accountId(): string {
        return this._accountId;
    }

    set accountId(value: string) {
        this._accountId = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get status(): any {
        return this._status;
    }

    set status(value: any) {
        this._status = value;
    }

    get privilege(): Role {
        return this._privilege;
    }

    set privilege(value: Role) {
        this._privilege = value;
    }

    get company(): CompanyLittle | any {
        return this._company;
    }

    set company(value: CompanyLittle | any) {
        this._company = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    get photoUrl(): string {
        return this._photoUrl;
    }

    set photoUrl(value: string) {
        this._photoUrl = value;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

    get addressLine1(): string {
        return this._addressLine1;
    }

    set addressLine1(value: string) {
        this._addressLine1 = value;
    }

    get addressLine2(): string {
        return this._addressLine2;
    }

    set addressLine2(value: string) {
        this._addressLine2 = value;
    }

    get notes(): string {
        return this._notes;
    }

    set notes(value: string) {
        this._notes = value;
    }

    get createdBy(): string {
        return this._createdBy;
    }

    set createdBy(value: string) {
        this._createdBy = value;
    }

    get updatedBy(): string {
        return this._updatedBy;
    }

    set updatedBy(value: string) {
        this._updatedBy = value;
    }

    get createdOn(): Date {
        return this._createdOn;
    }

    set createdOn(value: Date) {
        this._createdOn = value;
    }

    get updatedOn(): Date {
        return this._updatedOn;
    }

    set updatedOn(value: Date) {
        this._updatedOn = value;
    }
}
