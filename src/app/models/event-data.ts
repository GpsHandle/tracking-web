/**
 * Created by beou on 6/2/17.
 */
export interface EventData {
    id: number;
    companyId: number; // company-id in db
    companyName: string;
    devId: number; // device-id in db
    deviceId: string,
    deviceName: string,
    latitude: number;
    longitude: number;
    altitude: number;
    address: string;
    timestamp: number
    speedKPH: number;
    heading: number;

    satelliteCount: number;
    batteryLevel: number;
    signalStrength: number;
    fuelLevel: number;
    fuelLevel2: number;
    fuelTotal: number;
    fuelRemain: number;
    age: number;

    //--
    status: string;

}
