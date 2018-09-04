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
import { DrawOptions, latLng, LatLng, Point } from 'leaflet';
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

        this.selected = {geojson: {}};

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

        this.editableLayers = L.featureGroup();
        this.editableLayers.addTo(this.map);

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

        // const CREATED: string;
        // const EDITED: string;
        // const DELETED: string;
        // const DRAWSTART: string;
        // const DRAWSTOP: string;
        // const DRAWVERTEX: string;
        // const EDITSTART: string;
        // const EDITMOVE: string;
        // const EDITRESIZE: string;
        // const EDITVERTEX: string;
        // const EDITSTOP: string;
        // const DELETESTART: string;
        // const DELETESTOP: string;
        // const TOOLBAROPENED: string;
        // const TOOLBARCLOSED: string;
        // const TOOLBARCONTEXT: string;

        this.map.on(L.Draw.Event.EDITED, (event: any) => {
            console.log('EDITED', event);
        });

        this.map.on(L.Draw.Event.EDITMOVE, (event: any) => {
            console.log('MOVED', event.layer);
            this.coordinates = L.GeoJSON.latLngToCoords(event.layer._latlng);
        });

        this.map.on(L.Draw.Event.EDITRESIZE, (event: any) => {
            console.log('RESIZED', event.layer);
            this.radius = event.layer._mRadius;
        });

        this.map.on(L.Draw.Event.EDITVERTEX, (event: any) => {
            console.log('Polygon EDITVERTEX', event.poly);
            console.log('Polygon EDITVERTEX', event.poly.editing.latlngs[0]);

        });

        this.map.on(L.Draw.Event.CREATED, (event: any) => {

            console.log('toGeoJSON', this.geometry);
            console.log('toGeoJSON', event.layer.toGeoJSON());

            this.selected.geojson = event.layer.toGeoJSON();
            this.selected.geojson.properties.type = this.geometry.type;

            if (this.geometry.type === 'circle') {
                this.selected.geojson.properties.radius = event.layer._mRadius;
            }
                this.editableLayers.addLayer(event.layer);

                this.selected.geojson.properties.internalId = this.editableLayers.getLayerId(event.layer);
            // } else if (this.geometry.type === 'rectangle') {
            //     const layer = L.rectangle(this.selected.geojson.geometry.coordinates[0]);
            //     this.editableLayers.addLayer(layer);
            // }

            // //this.selected = event.layer;
            // if (_.toLower(this.geojson.type) === 'circle') {
            //     this.selected.geojson.type = 'Point';
            //     if (event.layer._mRadius) {
            //         this.selected.geojson.radius = event.layer._mRadius;
            //     }
            //     this.selected.geojson.coordinates = [event.layer._latlng.lat, event.layer._latlng.lng];
            // } else if (_.toLower(this.geojson.type) === 'rectangle') {
            //     this.selected.geojson.type = 'Polygon';
            //
            // } else if (_.toLower(this.geojson.type) === 'polygon') {
            //     this.selected.geojson.type = 'Polygon';
            // }

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
            //     this.selected.geojson.radius = event.layer._mRadius;
            // }
            //
            // //console.log('layer - geojson', gj);
            // this.editableLayers.addLayer(L.GeoJSON.geometryToLayer(this.selected, {
            //     pointToLayer: (feature, latlng) => {
            //         return L.circle(latlng, this.selected.geojson.radius)
            //     }
            // }));
            this.pending = true;

        });
    }

    public addNewGeofence(): void {
        this.showGeofenceDetails(true);
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
            if (g.geojson.geometry.type === 'Point') {
                let ly = L.GeoJSON.geometryToLayer(g.geojson,{
                    // @ts-ignore
                    pointToLayer: (feature, ll) => {
                        return L.circle(ll, g.geojson.properties.radius);
                    }
                });

                console.log('GeoFence', ly);
                ly.on('edit', (event: any) => {
                    console.log('Arguments', event);
                });

                this.editableLayers.addLayer(ly);
                g.geojson.properties.internalId = this.editableLayers.getLayerId(ly);
            } else if (g.geojson.geometry.type === 'Polygon') {
                const ly = L.GeoJSON.geometryToLayer(g.geojson);
                this.editableLayers.addLayer(ly);
                g.geojson.properties.internalId = this.editableLayers.getLayerId(ly);
            }
        });
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

    //-- check type of geometry
    public isCircle(): boolean {
        return _.toLower(this.type) === 'point';
    }

    public isPolygon(): boolean {
        return _.toLower(this.type) === 'polygon';
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
        //setTimeout(() => {this.map.invalidateSize()}, 1);
    }

    draw(type: string, opt?: DrawOptions.CircleOptions | DrawOptions.PolygonOptions | DrawOptions.RectangleOptions): void {
        if (this.geometry) {
            this.geometry.disable();
        }

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
        let layer: any;
        layer = this.editableLayers.getLayer(this.selected.geojson.properties.internalId);
        this._bakLayer = layer;
        layer.options.editing || (layer.options.editing = {});
        layer.editing.enable();
    }

    disable(): void {
        this.edit = false;
        // if (this._bakLayer) {
        //     this.editableLayers.addLayer(this._bakLayer);
        // }

        if (this._bakLayer) {
            this._bakLayer.editing.disable();
        }

        this.showGeofenceDetails(false);

        // layer = this.editableLayers.getLayer(this.selected.internalId);
        // if (layer) {
        //     layer.options.editing || (layer.options.editing = {});
        //     layer.editing.disable();
        // }

        //this.editableLayers.removeLayer(this.selected.geojson.properties.internalId);
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
                    this.edit = false;
                    this.selected = undefined;
                    this.showGeofenceDetails(false);
                    this.disable();
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
                    this.create = false;
                    this.selected = undefined;
                    this.showGeofenceDetails(false);
                    this.disable();
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
        if (!this.selected.geojson || !this.selected.geojson.geometry) {
            return undefined;
        } else {
            return this.selected.geojson.geometry.type;
        }
    }
    set type(t: string) {
        this.selected.geojson.geometry.type = t;
    }

    get coordinates(): any {
        if (this.isCircle()) {
                return this.selected.geojson.geometry.coordinates;
        } else if (this.isPolygon()) {
            return this.selected.geojson.geometry.coordinates[0];
        }
    }

    set coordinates(c: any) {
        if(this.isCircle()) {
            this.selected.geojson.geometry.coordinates = c;
        } else if (this.isPolygon()) {
            this.selected.geojson.geometry.coordinates[0] = c;
        }
    }

    get latlng(): any {
        return L.GeoJSON.coordsToLatLng(this.coordinates);
    }

    set latlng(ll: any) {
        this.coordinates = L.GeoJSON.latLngToCoords(ll);
    }


    get radius(): number {
        if (this.isCircle()) {
            return this.selected.geojson.properties.radius;
        } else {
            return undefined;
        }
        // if (this.selected.geojson) {
        //     return this.selected.geojson.radius;
        // } else {
        //     return 0;
        // }
    }
    set radius(r: number) {
        this.selected.geojson.properties.radius = r;
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
