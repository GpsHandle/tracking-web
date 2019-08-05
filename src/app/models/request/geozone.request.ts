import { Geozone } from 'app/models/geozone';

export class GeozoneRequest {
    accountIds: Array<number>;
    name: string;
    color: string;
    address: string;
    maxSpeedKPH: number;
    reverseGeozone: boolean;
    privateArea: boolean;
    geojson: string;

    updateFromGeofence(selectedGeofence: Geozone | any) {
        this.name = selectedGeofence.name;
        this.color = selectedGeofence.color;
        this.address = selectedGeofence.address;
        this.maxSpeedKPH = selectedGeofence.maxSpeedKPH;
        this.privateArea = selectedGeofence.privateArea;
        this.reverseGeozone = selectedGeofence.reverseGeozone;
        this.geojson = JSON.stringify(selectedGeofence.geojson);
    }
}
