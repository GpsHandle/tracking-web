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

import { StatusPieChart } from 'app/models/status-pie-chart';
import { PopupService } from 'app/main/tracking/live/popup/popup.service';
import { MappingUtils } from 'app/main/tracking/live/mapping-utils';
import { CircleMarker } from 'leaflet';
import { MatBottomSheet } from '@angular/material';
import { CommandComponent } from 'app/main/tracking/live/command/command.component';
import { ApplicationContext } from 'app/application-context';
import { Device } from 'app/models/device';
import { forkJoin, interval, of as observableOf, Subject, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { ChartAPI } from 'c3';

const TILE_OSM = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX = 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA';

@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit, OnDestroy, AfterViewInit {
    // liveEvents: EventData[];
    customDefault: L.Icon;
    map: L.Map;

    numberOfLoad: number = 0;
    markersCluster: MarkerClusterGroup;

    deviceList: Device[];
    allDeviceList: Device[];

    //-- chart
    private chart0: ChartAPI;
    private stats = [];
    private liveDev = new StatusPieChart(1,"Live", 0);
    private idleDev = new StatusPieChart(2,"Idle", 0);
    private stopDev = new StatusPieChart(3,"Stop", 0);
    private deadDev = new StatusPieChart(3,"Dead", 0);

    private totalDevice: number;

    selectedDevice: Device | any;
    selectedMarker: CircleMarker;
    currentMarker: L.Marker;

    private unsubscribe$ = new Subject<void>();

    constructor(private deviceService: DeviceService,
                private eventService: EventService,
                private applicationContext: ApplicationContext,
                private popupLink: PopupService,
                private bottomSheet: MatBottomSheet) { }

    ngOnInit() {
        this.numberOfLoad = 0;
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
                    //id: 'mapbox.streets',
                    //accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
                })]
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);

    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    loadLivesEvent(): void {
        if (this.numberOfLoad < 1) {
            this.applicationContext.spin(true);
        }

        interval(10 * 1000).pipe(
            startWith(10000),
            takeUntil(this.unsubscribe$),
            switchMap(() => {
                return this.deviceService.getAllDevice();
            }),
            map(data => {
                this.stats = [];
                this.liveDev.reset();
                this.idleDev.reset();
                this.stopDev.reset();
                this.deadDev.reset();

                this.markersCluster.clearLayers();
                this.allDeviceList = _.map(data, (device: Device) => {
                    device.lastUpdateTimeInWords = distanceInWordsToNow(device.lastEventTime) + ' ago';
                    device.stayedTimeInWords = distanceInWordsToNow(device.stayedTime);

                    const status = MappingUtils.getStatus(device.lastEventTime);
                    switch (status) {
                        case 'live':
                            this.liveDev.increase();
                            device.state = 2; //living
                            break;
                        case 'idle':
                            this.idleDev.increase();
                            device.state = 1; //idle
                            break;
                        case 'stop':
                            this.stopDev.increase();
                            device.state = 0; //stop
                            break;
                        case 'dead':
                            this.deadDev.increase();
                            device.state = -1;
                            break;
                    }

                    return device;
                });
                this.numberOfLoad++;
                this.totalDevice = this.allDeviceList.length;
                this.stats.push(this.liveDev, this.idleDev, this.stopDev, this.deadDev);
                return data;
            }),
            catchError(error => {
                return observableOf([]);
            })).subscribe(
            (data: Device[]) => {
                this.deviceList = _.filter(this.allDeviceList, (d) => {
                    return true;
                });

                data.forEach((device, index) => {
                    if (device.lastLatitude && device.lastLongitude) {
                        let marker = this.buildMarker(device);
                        this.popupLink.register(marker, device, (_smarker) => {this.currentMarker = _smarker});
                        if (this.currentMarker && !this.currentMarker.isPopupOpen()) {
                            this.currentMarker.togglePopup();
                        }
                        this.markersCluster.addLayer(marker);
                        marker.on('click', () => {
                            this.selectedDevice = device;
                            //circle around marker
                            if (this.selectedMarker) {
                                this.selectedMarker.removeFrom(this.map);
                            }
                            let center = L.latLng(this.selectedDevice.lastLatitude, this.selectedDevice.lastLongitude);
                            this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
                        });
                    }
                });

                if (this.selectedDevice) {
                    let center = L.latLng(this.selectedDevice.lastLatitude, this.selectedDevice.lastLongitude);
                    let oldZoom = this.map.getZoom();
                    this.map.setView(center, oldZoom);

                    //circle around marker
                    if (this.selectedMarker) {
                        this.selectedMarker.removeFrom(this.map);
                    }
                    this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
                } else if (this.deviceList.length > 0 ) {
                    this.map.addLayer(this.markersCluster);
                    console.log('this.numberOfLoad', this.numberOfLoad);
                    if (this.numberOfLoad === 1) {
                        this.applicationContext.spin(false);
                        let bounds: LatLngBounds = this.markersCluster.getBounds();
                        if (bounds.isValid()) {
                            this.map.fitBounds(bounds);
                        }

                    }

                    if (this.selectedMarker) {
                        this.selectedMarker.removeFrom(this.map);
                    }

                }
                this.draw();
            }
        );
    }

    buildMarker(dev: Device): L.Marker {
        let ll = L.latLng(dev.lastLatitude, dev.lastLongitude);
        let icon = this.buildIcon(dev);
        let popup = this.buildPopup(dev);
        let devName = dev.name ? dev.name : dev.deviceId;
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

    buildIcon(dev: Device): L.DivIcon {
        let htmlIcon = '';
        htmlIcon = '<div style="background-color:' + MappingUtils.getColor(dev.lastEventTime) + '; width: 100%; height: 100%;"></div>';
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

    buildPopup(dev: Device): L.Popup {
        let popup = L.popup();
        popup.setContent(document.createElement('div'));
        popup.options.offset = L.point(0, 0);

        return popup;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        this.deviceList = _.filter(this.allDeviceList, (dev: Device) => {
            return (dev.name && _.includes(dev.name, filterValue)) ||
                (dev.deviceId && _.includes(dev.deviceId, filterValue)) ||
                (dev.lastAddress && _.includes(dev.lastAddress, filterValue));
        });
    }

    //--
    selectThisDevice(event: any, device: Device | any): void {
        event.stopPropagation();

        if (this.selectedDevice) {
            this.selectedDevice.selected = false;
        }
        device.selected = !device.selected;

        const center = L.latLng(device.lastLatitude, device.lastLongitude);
        if (center) {
            this.map.setView(center, 15);
            this.selectedDevice = device;
            //circle around marker
            if (this.selectedMarker) {
                this.selectedMarker.removeFrom(this.map);
            }
            this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
        }
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

    openPanelCommand(event: Event, selected: Device) {
        if (event) {
            event.stopPropagation();
        }
        this.bottomSheet.open(CommandComponent, {data: {
                id: selected.id,
                deviceName: selected.name,
                deviceId: selected.deviceId
        }});
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
