import { AccountLittle } from 'app/models/little/account.little';

export class Driver {
    id: number;
    firstName: string;
    lastName: string;
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