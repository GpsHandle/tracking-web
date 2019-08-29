export class DeviceParkingReport {
    public devId: number;
    public deviceId: string;
    public deviceName: string;
    public latitude: number;
    public longitude: number;
    public altitude: number;
    public heading: number;
    public address: string;
    public odometerKM: number;
    public speedKPH: number;
    public status: string;
    public timestamp: number;
    public stoppedTime: number;

    public startParkingTime: number;
    public endParkingTime: number;
    public startParkingOdometterKM: number;
    public endParkingOdometterKM: number;
}