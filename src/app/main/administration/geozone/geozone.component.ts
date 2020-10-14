import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import * as L from 'leaflet';
import 'leaflet-editable';

import { LatLng } from 'leaflet';
import {forEach, remove, toLower} from "lodash-es";
import {GeozoneService} from "../../../core/services/geozone.service";
import {Geozone} from "../../../models/geozone";
import {ApplicationContext} from "../../../application-context";
import {GeozoneRequest} from "../../../models/request/geozone.request";
import {GeoUtils} from "./GeoUtils";

const TILE_OSM_URL = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA';
const TILE_GOOGLE_URL = 'https://www.google.com/maps/vt?lyrs=s@189&gl=en&x={x}&y={y}&z={z}';

@Component({
    selector: 'app-geozone',
    templateUrl: './geozone.component.html',
    styleUrls: ['./geozone.component.scss']
})
export class GeozoneComponent implements OnInit, AfterViewInit {

    private customDefault: L.Icon;
    private map: L.Map;
    private editableLayers: L.FeatureGroup<any>;

    showDetails: boolean = false;

    geofenceList: Array<Geozone>;
    geometryMap: Map<string, any>; // contains list of drawn polygon, circle ... with id to reference

    selected: Geozone | any;
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

        this.geometryMap = new Map<string, any>();

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
            //id: 'mapbox.streets',
            //accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
        });
        let google = L.tileLayer(TILE_GOOGLE_URL, {
            maxZoom: 18,
            attribution: 'google'
        });

        this.map = L.map('geo-map-id', {
            //ts-ignore
            editable: true,
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
    }

    public addNewGeofence(event?: Event): void {
        if (event) {
            event.stopPropagation();
        }
        this.selected = new Geozone();
        this.showDetail(true);
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
        if (this.geofenceList && this.geofenceList.length > 0) {
            forEach(this.geofenceList, (g) => {
                g = GeoUtils.convertGeofence(g);
                let geometryObj = null;
                if (g.geojson.properties.type === 'Circle') {
                    let ll = L.GeoJSON.coordsToLatLng(g.geojson.geometry.coordinates);
                    geometryObj = L.circle(ll, {radius: g.geojson.properties.radius}).addTo(this.map);
                } else if (g.geojson.properties.type === 'Rectangle') {
                    let lls = L.GeoJSON.coordsToLatLngs(g.geojson.geometry.coordinates, 1);
                    geometryObj = L.rectangle(lls).addTo(this.map);
                } else if (g.geojson.properties.type === 'Polygon') {
                    let lls = L.GeoJSON.coordsToLatLngs(g.geojson.geometry.coordinates, 1);
                    geometryObj = L.polygon(lls).addTo(this.map);
                }

                if (geometryObj) {
                    geometryObj.on('click', () => {
                        geometryObj.toggleEdit();
                    });

                    geometryObj.on('editable:drawing:start', () => {
                        if (this.isCircle()) {
                            this.radius = geometryObj._mRadius;
                        }
                        this.coordinates = geometryObj.toGeoJSON().geometry.coordinates;
                    });

                    geometryObj.on('editable:drawing:end', () => {
                        geometryObj.disableEdit();
                    });

                    geometryObj.on('editable:drawing:move', () => {
                        if (g.geojson.properties.type === 'Circle') {
                            this.radius = geometryObj._mRadius;
                        }
                        this.coordinates = geometryObj.toGeoJSON().geometry.coordinates;

                    });

                    this.geometryMap.set(g.name, geometryObj);
                }

            });
        }
    }

    //--
    public applyFilter(event: any): void {

    }

    public select(geofence: Geozone): void {
        this.selected = geofence;
        this.showDetail(true);
        this.map.panTo(this.center);
    }


    public showDetail(show: boolean): void {
        this.showDetails = show;
        setTimeout(() => {
            this.map.invalidateSize(true);
        }, 0);
    }

    //-- Delete, Edit
    delete(event: Event, geofence: Geozone): void {
        event.stopPropagation();

        console.log('Geofence', geofence);
        console.log('this.editableLayers', this.editableLayers);
        console.log('this.geofenceList', this.geofenceList);

        this.service._delete(geofence.id).subscribe(
            data => {
                this.pending = false;
                this.create = false;
                this.edit = false;
                this.selected = undefined;
                this.showDetail(false);

                this.applicationContext.info("Deleted geofence #" + geofence.name);
                remove(this.geofenceList, (g) => {
                    return (g.id === geofence.id);
                });
                this.editableLayers.removeLayer(this.geometryMap.get(geofence.name));
            },
            error => {},
            () => {}
        )
    }

    draw(type: string): void {
        switch (type) {
            case 'circle':
                this.geometry = this.map.editTools.startCircle();
                this.selected.geojson = this.geometry.toGeoJSON();
                this.type = 'Circle';
                break;
            case 'square':
                this.geometry = this.map.editTools.startRectangle();
                this.selected.geojson = this.geometry.toGeoJSON();
                this.type = 'Rectangle';
                break;
            case 'pentagon':
                this.geometry = this.map.editTools.startPolygon();
                this.selected.geojson = this.geometry.toGeoJSON();
                this.type = 'Polygon';
                break;
        }

        this.geometry.on('click', () => {
            this.geometry.toggleEdit();
        });

        this.geometry.on('editable:drawing:start', () => {
            if (this.isCircle()) {
                this.radius = this.geometry._mRadius;
            }
            this.coordinates = this.geometry.toGeoJSON().geometry.coordinates;
        });

        this.geometry.on('editable:drawing:end', () => {
            this.geometry.disableEdit();
            console.log("GeoJson", this.geometry.toGeoJSON());
        });

        this.geometry.on('editable:drawing:move', () => {
            if (this.isCircle()) {
                this.radius = this.geometry._mRadius;
            }
            this.coordinates = this.geometry.toGeoJSON().geometry.coordinates;

        });

    }

    cancel(): void {
        if (this.selected && this.geometryMap.get(this.selected.name)) {
            this.geometryMap.get(this.selected.name).disableEdit();
        }
        this.showDetail(false);
    }


    modify(geofence?: Geozone): void {
        console.log('XXX', geofence);
        console.log('XXX', this.selected);
        if (this.selected && this.geometryMap.get(this.selected.name)) {
            this.geometryMap.get(this.selected.name).disableEdit();
        }

        if (geofence) {
            this.edit = true;
            this.selected = geofence;
            if (this.geometryMap.get(geofence.name)) {
                this.geometryMap.get(geofence.name).enableEdit();
            }
        } else if (this.selected) {
            this.edit = true;
            if (this.geometryMap.get(this.selected.name)) {
                this.geometryMap.get(this.selected.name).enableEdit();
            }
        }
    }

    save(): void {
        let req = new GeozoneRequest();
        req.updateFromGeofence(this.selected);
        if (this.selected && this.selected.id) {
            this.geometryMap.get(this.selected.name).disableEdit();

            this.service.update(this.selected.id, req).subscribe(
                data => {
                    this.applicationContext.info('Updated Geozone #' + this.selected.name);
                },
                error => {
                    this.applicationContext.error('Not able to update geofence #' + this.selected.name);
                    this.pending = false;
                },
                () => {
                    this.pending = false;
                    this.edit = false;
                    this.selected = undefined;
                    this.showDetail(false);
                }
            );
        } else {
            this.service.create(req).subscribe(
                data => {
                    this.applicationContext.info('Created #' + this.selected.name);
                    this.geofenceList.push(data);

                    console.log('this.geometry', this.geometry);
                },
                error => {
                    this.pending = false;
                },
                () => {
                    this.pending = false;
                    this.create = false;
                    this.selected = undefined;
                    this.showDetail(false);
                }
            )
        }
    }

    //-- check type of geometry
    public isCircle(): boolean {
        return toLower(this.type) === 'circle';
    }

    public isPolygon(): boolean {
        return (toLower(this.type) === 'rectangle') || (toLower(this.type) === 'polygon');
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
        if (this.selected.geojson.properties) {
            return this.selected.geojson.properties.type;
        } else {
            return undefined;
        }
    }
    set type(t: string) {
        this.selected.geojson.properties.type = t;
    }

    get coordinates(): any {
        if (this.isCircle()) {
                return this.selected.geojson.geometry.coordinates || [0, 0];
        } else if (this.isPolygon()) {
            return this.selected.geojson.geometry.coordinates[0];
        }
    }

    set coordinates(c: any) {
        this.selected.geojson.geometry.coordinates = c;
    }

    get latlng(): any {
        return L.GeoJSON.coordsToLatLng(this.coordinates);
    }

    set latlng(ll: any) {
        // @ts-ignore
        this.coordinates = L.GeoJSON.latLngToCoords(ll);
    }


    get radius(): number {
        if (this.isCircle()) {
            return this.selected.geojson.properties.radius;
        } else {
            return undefined;
        }
    }

    set radius(r: number) {
        this.selected.geojson.properties.radius = r;
    }

    get center(): L.LatLng {
        if (this.isCircle()) {
            return L.GeoJSON.coordsToLatLng(this.coordinates);
        } else {
            let abc = [];
            forEach(this.coordinates, (coor: [number, number]) => {
                abc.push(L.GeoJSON.coordsToLatLng(coor))
            });

            return abc.length > 0 ? L.latLngBounds(abc).getCenter() : new LatLng(0, 0);
        }
    }
}
