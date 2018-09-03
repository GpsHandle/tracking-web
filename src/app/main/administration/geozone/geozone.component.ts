import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeozoneService } from 'app/services/geozone.service';
import { Geofence } from 'app/models/geozone';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';
import * as L from 'leaflet';
import 'leaflet-draw';

import { GeozoneRequest } from 'app/models/request/geozone.request';
import { ApplicationContext } from 'app/application-context';
import { GeoUtils } from 'app/main/administration/geozone/GeoUtils';
import { DrawOptions, latLng, LatLng, Layer, Point } from 'leaflet';
import { Feature} from 'geojson';
import { FeatureGroup } from 'leaflet';

const TILE_OSM_URL = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const TILE_GOOGLE_URL = 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}';

@Component({
    selector: 'app-geozone',
    templateUrl: './geozone.component.html',
    styleUrls: ['./geozone.component.scss']
})
export class GeozoneComponent implements OnInit, AfterViewInit {

    private customDefault: L.Icon;
    private map: L.Map;
    private editableLayers: FeatureGroup<any>;
    //private drawControl: any;

    showDetails: boolean = false;

    geofenceList: Array<Geofence>;

    selected: Geofence | any;
    geometry: any;

    private _edit: boolean = false;
    private _create: boolean = false;
    private _pending: boolean = false;

    private _bakLayer: any;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private applicationContext: ApplicationContext,
        private service: GeozoneService) { }

    ngOnInit() {
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });

        this.selected = {geometry: {}};

        this.loadAllGeozone();
    }

    ngAfterViewInit(): void {
        let osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        let osm = L.tileLayer(TILE_OSM_URL, {
            maxZoom: 18,
            attribution: osmAttrib
        });
        let mapbox = L.tileLayer(TILE_MAPBOX_URL, {
            maxZoom: 18,
            attribution: osmAttrib,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
        });
        let google = L.tileLayer(TILE_GOOGLE_URL, {
            maxZoom: 18,
            attribution: 'google'
        });

        this.map = L.map('geo-map-id', {
            zoomControl: false,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);

        this.editableLayers = L.featureGroup().addTo(this.map);

        L.control.layers(
            {
                'osm': osm.addTo(this.map),
                'google': google,
                'mapbox': mapbox
            },
            {
                'drawlayer': this.editableLayers
            },
            {
                position: 'topright',
                collapsed: true
            }).addTo(this.map);

        this.map.on(L.Draw.Event.EDITMOVE, (event: any) => {
            console.log('MOVED', event.layer);
        });

        this.map.on(L.Draw.Event.EDITRESIZE, (event: any) => {
            console.log('RESIZED', event.layer);
        });

        this.map.on(L.Draw.Event.CREATED, (event: any) => {
            this.editableLayers.addLayer(event.layer);

            console.log('toGeoJSON', event.layer.toGeoJSON());

            //this.selected = event.layer;
            if (_.toLower(this.geometry.type) === 'circle') {
                this.selected.geometry.type = 'Point';
                if (event.layer._mRadius) {
                    this.selected.geometry.radius = event.layer._mRadius;
                }
                this.selected.geometry.coordinates = [event.layer._latlng.lat, event.layer._latlng.lng];
            } else if (_.toLower(this.geometry.type) === 'rectangle') {
                this.selected.geometry.type = 'Polygon';

            } else if (_.toLower(this.geometry.type) === 'polygon') {
                this.selected.geometry.type = 'Polygon';
            }

            // this.showGeofenceDetails(true);
            // this.edit = true;
            //
            //
            //
            // console.log('object', event);
            // console.log('layer', event.layer);
            // let gj = event.layer.toGeoJSON();
            // this.selected = event.layer.toGeoJSON();
            // if (event.layer._mRadius) {
            //     this.selected.geometry.radius = event.layer._mRadius;
            // }
            //
            // //console.log('layer - geojson', gj);
            // this.editableLayers.addLayer(L.GeoJSON.geometryToLayer(this.selected, {
            //     pointToLayer: (feature, latlng) => {
            //         return L.circle(latlng, this.selected.geometry.radius)
            //     }
            // }));
            this.pending = true;

        })
    }

    public showDrawToolbar(show: boolean): void {
        // if(show) {
        //     this.map.addControl(this.drawControl);
        // } else {
        //     this.map.removeControl(this.drawControl);
        // }
    }

    public addNewGeofence(): void {
        this.showGeofenceDetails(true);
        this.showDrawToolbar(true);
        this.create = true;
    }

    private loadAllGeozone(): void {
        this.service.getAll().subscribe(
            data => {
                this.geofenceList = data;
            },
            error => {},
            () => {
                this.drawGeofences();
            }
        );
    }

    private drawGeofences(): void {
        _.forEach(this.geofenceList, (g) => {
            console.log('data', g);
            g = GeoUtils.convertGeofence(g);
            let gj: Feature<any>;
            gj = {
                type: "Feature",
                properties: {},
                geometry: g.geometry
            };

            let ly = L.GeoJSON.geometryToLayer(gj,{
                pointToLayer: (feature, latlng) => {
                    return L.circle(latlng, g.geometry.radius);
                }
            });

            console.log('GeoFence', ly);

            // ly.on('edit', (event: any) => {
            //     console.log('Arguments', event.target.toGeoJSON());
            // });

            // {
                //     pointToLayer: (feature, latlng) => {
                //         return L.circle(latlng, this.selected.geometry.radius)
                //     }

            this.editableLayers.addLayer(ly);

            this.map.fitBounds(this.editableLayers.getBounds());
            g.internalId = this.editableLayers.getLayerId(ly);
        });

        // this.editableLayers.eachLayer((layer: Layer) => {
        //     console.log('Added Layer: ', layer);
        //     layer.options.editing || (layer.options.editing = {});
        //     layer.editing.enable();
        // });
    }

    //--
    public applyFilter(event: any): void {

    }

    public select(geofence: Geofence): void {
        this.showGeofenceDetails(true);

        this.selected = GeoUtils.convertGeofence(geofence);

        this.map.panTo(this.center);
        //this.map.fitBounds(this.editableLayers.getBounds());
    }


    public showGeofenceDetails(show: boolean): void {
        this.showDetails = show;
        setTimeout(() => {
            this.map.invalidateSize(true);
        }, 0);
    }

    public isCircle(): boolean {
        return (this.selected.geometry && (_.toLower(this.selected.geometry.type) === 'point' || _.toLower(this.selected.geometry.type) === 'circle'));
    }

    public isPolygon(): boolean {
        return (this.selected.geometry && (_.toLower(this.selected.geometry.type) === 'polygon' || _.toLower(this.selected.geometry.type) === 'rectangle'));
    }


    //-- Delete, Edit
    delete(event: Event, geofence: Geofence): void {
        event.stopPropagation();
        this.service._delete(geofence.id).subscribe(
            data => {
            },
            error => {},
            () => {
                this.applicationContext.info("Deleted geofence #" + geofence.name);
                _.remove(this.geofenceList, (g) => {
                    return (g.id === geofence.id);
                });
                this.editableLayers.removeLayer(geofence.internalId);
            }
        )
    }

    hide() {
        this.showDetails = false;
        setTimeout(() => {this.map.invalidateSize()}, 1);
    }

    draw(type: string, opt?: DrawOptions.CircleOptions | DrawOptions.PolygonOptions | DrawOptions.RectangleOptions): void {
        switch (type) {
            case 'circle':
                this.geometry = new L.Draw.Circle(this.map, opt);
                break;
            case 'square':
                this.geometry = new L.Draw.Rectangle(this.map, opt);
                break;
            case 'pentagon':
                this.geometry = new L.Draw.Polygon(this.map, opt);
                break;
        }

        this.geometry.enable();
    }

    cancel(): void {
        this.disable();
        this.hide();
    }

    enable(): void {
        this.edit = true;
        let layer: Layer | any;
        layer = this.editableLayers.getLayer(this.selected.internalId);
        this._bakLayer = layer;
        layer.options.editing || (layer.options.editing = {});
        layer.editing.enable();
    }

    disable(): void {
        this.edit = false;
        if (this._bakLayer) {
            this.editableLayers.addLayer(this._bakLayer);
        }
        let layer: Layer | any;
        // layer = this.editableLayers.getLayer(this.selected.internalId);
        // if (layer) {
        //     layer.options.editing || (layer.options.editing = {});
        //     layer.editing.disable();
        // }

        this.editableLayers.removeLayer(this.selected.internalId);
    }

    modify(geofence?: Geofence): void {
        if (geofence) {
            this.selected = geofence;
        }
        this.enable();
    }

    save(): void {
        let req = new GeozoneRequest();
        req.updateFromGeofence(this.selected);
        if (this.selected && this.selected.id) {
            this.service.update(this.selected.id, req).subscribe(
                data => {
                    this.applicationContext.info('Updated Geofence #' + this.selected.name);
                },
                error => {
                    this.applicationContext.error('Not able to update geofence #' + this.selected.name);
                    this.pending = false;
                },
                () => {
                    this.pending = false;
                }
            );
        } else {
            this.service.create(req).subscribe(
                data => {
                    this.applicationContext.info('Created #' + this.selected.name);
                    this.geofenceList.push(data);
                },
                error => {
                    this.pending = false;
                },
                () => {
                    this.pending = false;
                }
            )
        }

    }
    //-get-set
    get create(): boolean {
        return this._create;
    }

    set create(crt: boolean) {
        this._create = crt;
    }

    get edit(): boolean {
        return this._edit;
    }

    set edit(value: boolean) {
        this._edit = value;
    }

    get pending(): boolean {
        return this._pending;
    }

    set pending(value: boolean) {
        this._pending = value;
    }

    get type(): string {
        if (this.selected.geometry) {
            return this.selected.geometry.type;
        } else {
            return "undefined";
        }

    }
    set type(t: string) {
        this.selected.geometry.type = t;
    }

    get coordinates(): any {
        if (this.isCircle()) {
            if(this.selected.geometry) {
                return this.selected.geometry.coordinates;
            } else {
                return [];
            }
        } else if (this.isPolygon()) {
            if (this.selected.geometry) {
                return this.selected.geometry.coordinates[0];
            } else {
                return [];
            }
        }
    }



    set coordinates(c: any) {
        if(this.isCircle()) {
            this.selected.geometry.coordinates = c;
        } else if (this.isPolygon()) {
            this.selected.geometry.coordinates[0] = c;
        }
    }

    get radius(): number {
        if (this.selected.geometry) {
            return this.selected.geometry.radius;
        } else {
            return 0;
        }
    }
    set radius(r: number) {
        this.selected.geometry.radius = r;
    }

    get center(): LatLng {
        if (this.isCircle()) {
            return L.GeoJSON.coordsToLatLng(this.coordinates);
        } else {
            let abc = [];
            _.forEach(this.coordinates, (coor: [number, number]) => {
                abc.push(L.GeoJSON.coordsToLatLng(coor))
            });

            return L.latLngBounds(abc).getCenter();
        }
    }
}
