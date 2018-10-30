import { Device } from 'app/models/device';
import * as _ from 'lodash';

export class DeviceRequest {
    id: number;

    name: string;
    description: string;

    deviceId: string;
    imei: string;

    companyId: number;
    accountIds: Array<number>;
    alertProfileIds: Array<number>;

    vehicleId: number;
    protocol: string;
    timeZoneStr: string;
    maxStoredDataTime: number;
    expiredOn: Date;
    status;

    ipAddress: string;
    port: number;

    serialNumber: string;
    modelName: string;

    manufacturerName: string;
    firmwareVersion: string;
    originalCountry: string;


    constructor(device?: Device) {
        if (device) {
            this.id = device.id;
            this.name = device.name;
            this.deviceId = device.deviceId;
            this.companyId = device.company ? device.company.id : null;
            this.accountIds = _.map(device.accounts, (acc) => {
                return acc.id;
            });

            this.expiredOn = device.expiredOn;
            this.status = device.status;

            this.vehicleId = device.vehicleId;
            this.ipAddress = device.ipAddress;
            this.port = device.port;
            this.protocol = device.protocol;
            this.serialNumber = device.serialNumber;
            this.modelName = device.modelName;
            this.manufacturerName = device.manufacturerName;
            this.firmwareVersion = device.firmwareVersion;
            this.originalCountry = device.originalCountry;
        }
    }
}
