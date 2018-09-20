import { ContactLittle } from 'app/models/little/contact.little';
import { CompanyLittle } from 'app/models/little/company.little';
import { AccountLittle } from 'app/models/little/account.little';

export class Driver {
    id: number;
    firstName: string;
    lastName: string;
    contacts: Array<ContactLittle>;
    dateOfBirth: Date;
    driverExperiencesMonths: number;
    typeOfVehicleExperienced: string;
    driverLicenseNumber: string;
    driverLicenseType: string;
    driverLicenseTypeDescription: string;
    driverLicenseIssueDate: Date;
    driverLicenseExpiredDate: string;

    //--
    public createdBy: string;
    public createdOn: Date;
    public updatedBy: string;
    public updatedOn: Date;
}