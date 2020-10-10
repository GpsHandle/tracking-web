import {map as _map} from 'lodash-es';
import {Device} from "../device";

export class DeviceRequest {
    id: number;

    name: string;
    description: string;

    deviceId: string;
    uniqueId: string;
    imei: string;

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
            this.uniqueId = device.uniqueId;
            this.accountIds = _map(device.accounts, (acc) => {
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
