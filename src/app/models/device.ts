import {AccountLittle} from "./little/account.little";
import {AlertProfileLittle} from "./little/alert-profile.little";

export interface Device {
    id: number;

    name: string;
    description: string;
    deviceId: string;
    uniqueId: string;
    imei: string;

    accounts: Array<AccountLittle | any>;
    alertProfiles: Array<AlertProfileLittle | any>

    vehicleId: number;
    vehicleName: string;

    ipAddress: string;
    port: number;

    protocol: string;
    timeZone: string;
    maxStoredDataTime: number;

    status: string;
    expiredOn: Date;


    serialNumber: string;
    modelName: string;

    manufacturerName: string;
    firmwareVersion: string;
    originalCountry: string;

    lastEventTime: number;
    lastSpeedKph: number;
    lastLatitude: number;
    lastLongitude: number;
    lastAddress: string;
    stayedTime: number;

    speedKph: number;
    //--
    createdBy: string;
    createdOn: Date;
    updatedBy: string;
    updatedOn: Date;

    lastUpdateTimeInWords: string;
    stayedTimeInWords: string;
    selected: boolean;
    state: number; //stopped, living, idle

    marker: L.Marker;
}
