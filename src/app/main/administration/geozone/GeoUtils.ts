import { Geozone } from 'app/models/geozone';

export class GeoUtils {
    public static convertGeofence(data: Geozone): Geozone {
        try {
            data.geojson = JSON.parse(data.geojson);
        } catch (e) {
            // not json
        }
        return data;
    }

    public static convertGeometry(data: string) : any {
        try {
            return JSON.parse(data);
        } catch (e) {
            return {type: 'Point', coordinates: [0, 0]}
        }
    }

}
