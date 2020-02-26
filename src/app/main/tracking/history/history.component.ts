import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator';
import 'leaflet-easybutton';

import { EventService } from 'app/services/event.service';
import { EventData } from 'app/models/event-data';

import * as _ from 'lodash';
import { Polyline } from 'leaflet';
import { MatTableDataSource } from '@angular/material/table';

import * as d3 from 'd3';
import * as c3 from 'c3';

import { SelectionModel } from '@angular/cdk/collections';
import { ApplicationContext } from 'app/application-context';
import { PrimitiveArray } from 'c3';

const TILE_OSM = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX = 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA';


@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private id: string;
    private map: L.Map;
    private selectedMarker: L.Marker;
    private historyEvents: EventData[];

    private historyEventsOptimizeForChart: EventData[];
    private timestampCol: [string, ...PrimitiveArray] = ['timestamp'];
    private speedKphCol: [string, ...PrimitiveArray] = ['SpeedKPH'];
    private fuelLevelCol: [string, ...PrimitiveArray] = ['FuelLevel'];

    private polyline: Polyline;
    private decor: any;
    private timeFrom: number;
    private timeTo: number;

    private _name: string;

    private iconDefault: L.Icon;

    dataSource: MatTableDataSource<EventData> | null;
    displayedColumns = ['location', 'heading', 'speedKPH', 'address', 'status', 'timestamp', 'age'];
    selection = new SelectionModel<EventData>(true, []);

    timerange: any;

    //charting
    private chart: any;

    constructor(private route: ActivatedRoute,
                private eventService: EventService,
                private applicationContext: ApplicationContext) {

    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.iconDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png',
            iconAnchor: [12.5, 41]
        });

        this.dataSource = new MatTableDataSource();
        this.timerange = '2';
        this.timeTo = this.timeTo ? this.timeTo : (new Date()).getTime();
        this.timeFrom = this.timeFrom ? this.timeFrom : this.timeTo - this.timerange * 60 * 60 * 1000;
        this.loadHistoryEvents();

    }
    ngAfterViewInit(): void {
        if (!this.map) {
            this.map = L.map('map2', {
                zoomControl: false,
                center: L.latLng(21.731253, 105.996139),
                zoom: 12,
                minZoom: 1,
                maxZoom: 18,

                layers: [
                    L.tileLayer(TILE_MAPBOX, {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                        //id: 'mapbox.streets',
                        //accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
                    })]
            });
        }

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);

    }

    timeDistanceChange(): void {
        console.log('timerange', this.timerange)
        if (this.timerange !== 'custom') {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - this.timerange * 60 * 60 * 1000;
            this.loadHistoryEvents();
        } else {

        }
    }

    private loadHistoryEvents(): void {
        this.applicationContext.spin(true);
        this.eventService.getHistoryEvents(this.id, this.timeFrom, this.timeTo).subscribe(
            data => {
                this.historyEvents = data;

                let h = _.head(data);
                let l = _.last(data);
                if (h && l) {
                    h.timestamp -= 1;
                    h.speedKPH=0;
                    l.timestamp+=1;
                    l.speedKPH=0;
                    this.historyEventsOptimizeForChart = _.concat(h, data, l);
                    this._name = h.deviceName || h.deviceId;
                } else {
                    this.historyEventsOptimizeForChart = data;
                }


                this.dataSource.data = data;
                let ahead = (new Date()).getTime();
                _.forEach(this.dataSource.data, (d: EventData) => {
                    //--
                    d.age = ahead - d.timestamp;
                    ahead = d.timestamp;
                });
                this.processEvents();
            },
            error => {
                this.applicationContext.spin(false);
            },
            () => {
                this.applicationContext.spin(false);
                this.draw();
            }
        )
    }

    select(row: EventData): void {
        console.log('Data Row', row);
        if (this.selectedMarker) {
            this.map.removeLayer(this.selectedMarker);
        }
        this.selectedMarker = L.marker([row.latitude, row.longitude], {icon: this.iconDefault}).addTo(this.map);
    }

    private processEvents(): void {
        if (this.historyEvents.length <= 0) {
            return;
        }

        let latlngs = _.map(this.historyEvents, (event) => {
           return L.latLng([event.latitude, event.longitude]); //new LatLng(event.latitude, event.longitude);
        });

        if (this.polyline) {
            this.map.removeLayer(this.polyline);
        }

        if (this.decor) {
            this.map.removeLayer(this.decor);
        }

        this.polyline = L.polyline(_.reverse(latlngs), {color: 'red'}).addTo(this.map);
        this.map.fitBounds(this.polyline.getBounds());

        this.decor = L.polylineDecorator(this.polyline, {
            patterns: [
                {
                    offset: 0,
                    repeat: 60,
                    symbol:
                        L.Symbol.arrowHead({
                            pixelSize: 15,
                            headAngle: 45,
                            pathOptions:
                                {
                                    fillOpacity: 0.9,
                                    weight: 0
                                }
                        })
                }]}).addTo(this.map);
    }

    private draw() {

        let uHist = _.uniqBy(this.historyEventsOptimizeForChart, 'timestamp');
        this.timestampCol = ['timestamp'];
        this.speedKphCol = ['SpeedKPH'];
        this.fuelLevelCol = ['FuelLevel'];

        _.forEach(uHist, (x) => {
            this.timestampCol.push(x.timestamp);
            this.speedKphCol.push(x.speedKPH);
            this.fuelLevelCol.push(x.fuelLevel);
        });

        if (this.chart) {
            //update
            this.chart.load({
                columns: [
                    this.timestampCol,
                    this.speedKphCol,
                    this.fuelLevelCol
                ]
            })
        } else {
            this.chart = c3.generate({
                bindto: '#chart2',
                data: {
                    columns: [
                        this.timestampCol,
                        this.speedKphCol,
                        this.fuelLevelCol
                    ],
                    type: 'spline',
                    x: 'timestamp'
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            count: 10,
                            format: '%H:%M'
                        }
                    },
                    y: {
                        label: 'Speed KPH',
                        min: 0,
                        padding: {
                            bottom: 0
                        },
                        tick: {
                            count: 5,
                            format: function(x) {
                                return d3.format('.0f')(x);
                            }
                        }
                    },
                    y2: {
                        label: 'Fuel Level',
                        show: true
                    }
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    show: false
                },

                subchart: {
                    show: true,
                    size: {
                        height: 40
                    }
                },
                zoom: {
                    enabled: true,
                    rescale: true
                }
            });
        }
    }
}
