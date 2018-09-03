import * as _ from 'lodash';
import * as d3 from 'd3';
import * as c3 from 'c3';
import { Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import { LatLngBounds, MarkerClusterGroup } from 'leaflet';

import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'


import {DeviceService} from 'app/services/device.service';
import {EventService} from 'app/services/event.service';
import {EventData} from 'app/models/event-data';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
// import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin'

import { StatusPieChart } from 'app/models/status-pie-chart';
import { DeviceLittle } from 'app/models/little/device.little';
import { PopupService } from 'app/main/tracking/live/popup/popup.service';
import { MappingUtils } from 'app/main/tracking/live/mapping-utils';
import { CircleMarker } from 'leaflet';
import { MatBottomSheet } from '@angular/material';
import { PanelCommandComponent } from 'app/main/tracking/live/panel-command/panel-command.component';
import { ApplicationContext } from 'app/application-context';

const TILE_OSM = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit, OnDestroy, AfterViewInit {
    liveEvents: EventData[];
    customDefault: L.Icon;
    map: L.Map;

    numberOfLoad: number = 0;
    markersCluster: MarkerClusterGroup;

    deviceList: DeviceLittle[];
    allDeviceList: DeviceLittle[];

    private alive: boolean;

    //-- chart
    private chart0: any;
    private stats: any;
    private liveDev = new StatusPieChart(1,"Live", 0);
    private idleDev = new StatusPieChart(2,"Idle", 0);
    private stopDev = new StatusPieChart(3,"Stop", 0);
    private deadDev = new StatusPieChart(3,"Dead", 0);

    private totalDevice: number;

    selectedDevice: DeviceLittle;
    selectedMarker: CircleMarker;

    constructor(private deviceService: DeviceService,
                private eventService: EventService,
                private applicationContext: ApplicationContext,
                private popupLink: PopupService,
                private bottomSheet: MatBottomSheet) { }

    ngOnInit() {
        this.alive = true;
        this.applicationContext.spin(true);

        forkJoin(
            this.deviceService.getAllLittle(),
            this.eventService.getLiveEvents()
        ).subscribe(
            data => {
                this.allDeviceList = data[0];
                this.liveEvents = data[1];
            },
            error => {
                this.applicationContext.error("Error when loading data");
            },
            () => {
                this.deviceList = _.filter(this.allDeviceList, (d) => {
                    return true;
                });
                this.applicationContext.spin(false);
                this.processEvents();
            }
        );


        //this.initOverviewPieChart();
    }

    ngAfterViewInit(): void {
        this.loadLivesEvent();
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });

        this.markersCluster = L.markerClusterGroup();


        this.map = L.map('map-id', {
            zoomControl: false,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
            minZoom: 1,
            maxZoom: 18,

            layers: [
                L.tileLayer(TILE_MAPBOX, {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
                })]
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);

    }



    ngOnDestroy(): void {
        this.alive = false;
    }

    loadLivesEvent(): void {
        TimerObservable.create(20, 10 * 1000)
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.eventService.getLiveEvents().subscribe(
                    liveEvents => {
                        this.liveEvents = liveEvents;
                        this.numberOfLoad++;
                        this.processEvents();
                    },
                    error => {

                    },
                    () => {

                    }
                );
            });
    }

    processEvents(): void {
        let icon = this.customDefault;
        this.stats = [];
        this.liveDev.reset();
        this.idleDev.reset();
        this.stopDev.reset();
        this.deadDev.reset();

        this.markersCluster.clearLayers();
        _.forEach(this.liveEvents, function (event) {
            let d = _.find(this.allDeviceList, function (dt) {
                return event.devId === dt.id;
            });

            if (d) {
                d.address = event.address;
                d.latitude = event.latitude;
                d.longitude = event.longitude;
                d.lastUpdateTime = event.timestamp;
                d.speedKph = event.speedKPH;
                d.status = event.status;
                d.lastUpdateTimeInWords = distanceInWordsToNow(event.timestamp) + ' ago';

                if (event.latitude && event.longitude) {
                    let marker = this.buildMarker(event);
                    this.popupLink.register(marker, event);
                    this.markersCluster.addLayer(marker);
                    marker.on('click', () => {
                        this.selectedDevice = d;
                        //circle around marker
                        if (this.selectedMarker) {
                            this.selectedMarker.removeFrom(this.map);
                        }
                        let center = L.latLng(this.selectedDevice.latitude, this.selectedDevice.longitude);
                        this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
                    });
                }

                const status = MappingUtils.getStatus(event.timestamp);
                switch (status) {
                    case 'live':
                        this.liveDev.increase();
                        d.state = 2; //living
                        break;
                    case 'idle':
                        this.idleDev.increase();
                        d.state = 1; //idle
                        break;
                    case 'stop':
                        this.stopDev.increase();
                        d.state = 0; //stop
                        break;
                    case 'dead':
                        this.deadDev.increase();
                        d.state = -1;
                        break;
                }
            }

        }.bind(this));

        if (this.selectedDevice) {
            let center = L.latLng(this.selectedDevice.latitude, this.selectedDevice.longitude);
            let oldZoom = this.map.getZoom();
            this.map.setView(center, oldZoom);

            //circle around marker
            if (this.selectedMarker) {
                this.selectedMarker.removeFrom(this.map);
            }
            this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
        } else if (this.liveEvents.length > 0 ) {
            this.map.addLayer(this.markersCluster);
            if (this.numberOfLoad === 1) {
                let bounds: LatLngBounds = this.markersCluster.getBounds();
                if (bounds.isValid()) {
                    this.map.fitBounds(bounds);
                }

            }

            if (this.selectedMarker) {
                this.selectedMarker.removeFrom(this.map);
            }

        }
        this.totalDevice = this.liveEvents.length;
        this.stats.push(this.liveDev, this.idleDev, this.stopDev, this.deadDev);
        this.draw();
    }

    buildMarker(event: EventData): L.Marker {
        let ll = L.latLng(event.latitude, event.longitude);
        let icon = this.buildIcon(event);
        let popup = this.buildPopup(event);


        let devName = event.deviceName ? event.deviceName : event.deviceId;

        let m = L.marker(ll, {icon: icon})
            .bindTooltip(devName, {
                permanent: true,
                direction: 'bottom',
                offset: L.point(0, 6),
                opacity: 1,
                className: 'marker-label'
            }).bindPopup(popup);
        return m;
    }

    buildIcon(event: EventData): L.DivIcon {
        let htmlIcon = '';
        htmlIcon = '<div style="background-color:' + MappingUtils.getColor(event.timestamp) + '; width: 100%; height: 100%;"></div>';
        // html?: string | false;
        // bgPos?: PointExpression;
        // iconSize?: PointExpression;
        // iconAnchor?: PointExpression;
        // popupAnchor?: PointExpression;
        // className?: string;
        return L.divIcon({
            html: htmlIcon
        });
    }

    buildPopup(event: EventData): L.Popup {
        let popup = L.popup();
        popup.setContent(document.createElement('div'));
        popup.options.offset = L.point(0, 0);

        return popup;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        this.deviceList = _.filter(this.allDeviceList, (dev: DeviceLittle) => {
            return (dev.name && _.includes(dev.name, filterValue)) ||
                (dev.deviceId && _.includes(dev.deviceId, filterValue)) ||
                (dev.address && _.includes(dev.address, filterValue));
        });
    }

    selectThisDevice(event: any, device: DeviceLittle): void {
        event.stopPropagation();
        if (this.selectedDevice) {
            this.selectedDevice.selected = false;
        }
        device.selected = !device.selected;

        let center = L.latLng(device.latitude, device.longitude);
        this.map.setView(center, 15);

        this.selectedDevice = device;
        //circle around marker
        if (this.selectedMarker) {
            this.selectedMarker.removeFrom(this.map);
        }
        this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
    }

    closePanelDetails() {
        this.selectedDevice = null;
        setTimeout(() => {
            this.map.invalidateSize(true);
        }, 0);
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    openPanelCommand(event: Event) {
        if (event) {
            event.stopPropagation();
        }

        this.bottomSheet.open(PanelCommandComponent);
    }

    requestLocationUpdate(event: Event) {
        event.stopPropagation();
    }

    private draw() {
        if (this.chart0) {
            this.updatePie();
        } else {
            this.createPie();
        }
    }

    private createPie() {
        this.chart0 = c3.generate({
            bindto: '#chart0',
            size: {
                width: 250,
                height: 200
            },
            transition: {
                duration: 0
            },
            data: {
                columns: [
                    ['Live',    this.liveDev.count],
                    ['IDLE',    this.idleDev.count],
                    ['Stopped', this.stopDev.count],
                    ['Dead',    this.deadDev.count],
                ],
                colors: {
                    Live: '#00e80e',
                    IDLE: '#ffb403',
                    Stopped: '#e23015',
                    Dead: '#b9b3b9'
                },
                type: 'donut',
                // selection: {
                //     enabled: true
                // },
                // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            tooltip: {
                format: {
                    value: function (value, ratio, id, index) {
                        return value + "(" + d3.format(".0%")(ratio) + ")";
                    }
                }
            },
            legend: {
                position: 'right'
            },
            donut: {
                title: '',
                label: {
                    format: function (value, ratio, id) {
                        return d3.format(' ')(value);
                    }
                }
            }
        });

        d3.select('#chart0 .c3-chart-arcs-title')
            .attr('font-size', '2em')
            //.attr('class', 'total-device')
            .text(() => this.totalDevice);
    }

    private updatePie() {
        const cols = {
            columns: [
                ['Live',    this.liveDev.count],
                ['IDLE',    this.idleDev.count],
                ['Stopped', this.stopDev.count],
                ['Dead',    this.deadDev.count],
            ]
        };
        this.chart0.load(cols);
        d3.select('#chart0 .c3-chart-arcs-title')
            .attr('font-size', '2em')
            .text(() => this.totalDevice);
    }
}
