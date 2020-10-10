import {AccountLittle} from "./little/account.little";
import {AlertProfileLittle} from "./little/alert-profile.little";

export class Device {
    public id: number;

    public name: string;
    public description: string;
    public deviceId: string;
    public uniqueId: string;
    public imei: string;

    public accounts: Array<AccountLittle | any>;
    public alertProfiles: Array<AlertProfileLittle | any>

    public vehicleId: number;
    public vehicleName: string;

    public ipAddress: string;
    public port: number;

    public protocol: string;
    timeZone: string;
    maxStoredDataTime: number;

    status: string;
    expiredOn: Date;


    public serialNumber: string;
    public modelName: string;

    public manufacturerName: string;
    public firmwareVersion: string;
    public originalCountry: string;

    lastEventTime: number;
    lastSpeedKph: number;
    lastLatitude: number;
    lastLongitude: number;
    lastAddress: string;
    stayedTime: number;
    //--
    public createdBy: string;
    public createdOn: Date;
    public updatedBy: string;
    public updatedOn: Date;

    public lastUpdateTimeInWords: string;
    public stayedTimeInWords: string;
    public selected: boolean;
    public state: number; //stopped, living, idle

    public marker: L.Marker;
}
