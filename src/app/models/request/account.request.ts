import { Account } from 'app/models/account';
import { Role } from 'app/models/role';

export class AccountRequest {
    id: number;
    accountId: string;
    firstName: string;
    lastName: string;
    password: string;
    status: string;
    privilege: Role;
    phoneNumber: string;
    photoUrl: string;
    emailAddress: string;
    addressLine1: string;
    addressLine2: string;
    notes: string;


    constructor(account? : Account) {
        if (account) {
            this.id = account.id;
            this.accountId = account.accountId;
            this.firstName = account.firstName;
            this.lastName = account.lastName;
            this.status = account.status;
            this.privilege = account.privilege;
            this.phoneNumber = account.phoneNumber;
            this.photoUrl = account.photoUrl;
            this.emailAddress = account.emailAddress;
            this.addressLine1 = account.addressLine1;
            this.addressLine2 = account.addressLine2;
            this.notes = account.notes;
        }
    }
}
