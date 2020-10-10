export class Driver {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;

    address: string;

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
