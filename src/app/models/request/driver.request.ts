export class DriverRequest {
    id: number;
    firstName: string;
    lastName: string;
    contactIds: Array<number>;
    dateOfBirth: Date;
    driverExperiencesMonths: number;
    typeOfVehicleExperienced: string;
    driverLicenseNumber: string;
    driverLicenseType: string;
    driverLicenseTypeDescription: string;
    driverLicenseIssueDate: Date;
    driverLicenseExpiredDate: string;
}