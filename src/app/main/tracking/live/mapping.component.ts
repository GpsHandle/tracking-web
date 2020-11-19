import {filter, forEach, includes, map as _map} from 'lodash-es';
import * as d3 from 'd3';
import * as c3 from 'c3';
import {Component, OnDestroy, OnInit, AfterViewInit, Inject, PLATFORM_ID} from '@angular/core';
import 'leaflet.markercluster';
import {
    Icon, Map, LatLngBounds, Marker, DivIcon, Popup,
    icon, markerClusterGroup, map as lmap,
    latLng, control, tileLayer, marker, point,
    divIcon, popup, circleMarker, MarkerClusterGroup
} from 'leaflet';

import { formatDistanceToNow } from 'date-fns';
import { CircleMarker } from 'leaflet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {Observable, Subscription} from 'rxjs';
import { ChartAPI } from 'c3';
import { PrimitiveArray } from 'c3';
import {BreakpointObserver} from "@angular/cdk/layout";
import {RootFacade} from '../../../stores/root.facade';
import {ApplicationContext} from "../../../application-context";
import {Device} from "../../../models/device";
import {DeviceService} from "../../../core/services/device.service";
import {StatusPieChart} from "../../../models/status-pie-chart";
import {EventService} from "../../../core/services/event.service";
import {MappingUtils} from "./mapping-utils";
import {PopupService} from "./popup/popup.service";
import {CommandComponent} from "./command/command.component";
import {isPlatformBrowser} from "@angular/common";

const TILE_OSM = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA';

@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit, OnDestroy, AfterViewInit {
    customDefault: Icon;
    map: Map;
    markersCluster: MarkerClusterGroup;
    deviceFilterText: string;
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
    currentMarker: Marker;
    sidenavOpened$: Observable<boolean>;
    sidenavMode$: Observable<string>;

    subscription: Subscription;

    trackingDeviceList$ = this.facade.trackingDeviceList$;
    constructor(private breakpointObserver: BreakpointObserver, private deviceService: DeviceService,
                private eventService: EventService,
                private facade: RootFacade,
                private applicationContext: ApplicationContext,
                private popupLink: PopupService,
                private bottomSheet: MatBottomSheet,
                @Inject(PLATFORM_ID) private platformId: any) {
        this.sidenavMode$ = this.facade.sidenavMode$;
        this.sidenavOpened$ = this.facade.sidenavOpened$;

    }

    ngOnInit() {
        this.markersCluster  = <MarkerClusterGroup>markerClusterGroup();
        this.subscription = this.trackingDeviceList$.subscribe(data => this.processData(data));
    }

    ngAfterViewInit(): void {
        this.customDefault = icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });

        // load
        this.facade.loadAllDevices();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    processData(dataState: any) {
        console.log('Data', dataState);
        if (!dataState) return;
        const data = dataState;
        this.stats = [];
        this.liveDev.reset();
        this.idleDev.reset();
        this.stopDev.reset();
        this.deadDev.reset();

        if (this.markersCluster) {
            this.markersCluster.clearLayers();
        }
        this.allDeviceList = _map(data, (xdevice: Device) => {
            const device = Object.assign({selected: false}, xdevice);
            device.lastUpdateTimeInWords = formatDistanceToNow(device.lastEventTime) + ' ago';
            device.stayedTimeInWords = formatDistanceToNow(device.stayedTime);
            device.marker = this.buildMarker(device);

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
        this.totalDevice = this.allDeviceList.length;
        this.stats.push(this.liveDev, this.idleDev, this.stopDev, this.deadDev);

        this.deviceList = filter(this.allDeviceList, (dev: Device) => {
            if (this.deviceFilterText) {
                return (dev.name && includes(dev.name, this.deviceFilterText)) ||
                    (dev.deviceId && includes(dev.deviceId, this.deviceFilterText)) ||
                    (dev.lastAddress && includes(dev.lastAddress, this.deviceFilterText));
            } else {
                return true;
            }

        });
        this.updateMap();
        this.draw();
    }

    buildMarker(dev: Device): Marker {
        let ll = latLng(dev.lastLatitude, dev.lastLongitude);
        let icon = this.buildIcon(dev);
        let popup = this.buildPopup(dev);
        let devName = dev.name ? dev.name : dev.deviceId;
        let m = marker(ll, {icon: icon})
            .bindTooltip(devName, {
                permanent: true,
                direction: 'bottom',
                offset: point(0, 6),
                opacity: 1,
                className: 'marker-label'
            }).bindPopup(popup);
        return m;
    }

    buildIcon(dev: Device): DivIcon {
        let htmlIcon = '';
        htmlIcon = '<div style="background-color:' + MappingUtils.getColor(dev.lastEventTime) + '; width: 100%; height: 100%;"></div>';
        // html?: string | false;
        // bgPos?: PointExpression;
        // iconSize?: PointExpression;
        // iconAnchor?: PointExpression;
        // popupAnchor?: PointExpression;
        // className?: string;
        return divIcon({
            html: htmlIcon
        });
    }

    buildPopup(dev: Device): Popup {
        if (isPlatformBrowser(this.platformId)) {
            let xpopup = popup();
            xpopup.setContent(document.createElement('div'));
            xpopup.options.offset = point(0, 0);
            return xpopup;
        }
    }


    //--
    selectThisDevice($event: any, device: Device | any): void {
        $event.stopPropagation();

        if (this.selectedDevice) {
            this.selectedDevice.selected = false;
        }
        device.selected = !device.selected;
        this.selectedDevice = device;
        this.xUpdate();
        //this.facade.selectDevice(device);
    }

    closePanelDetails() {
        this.selectedDevice = null;
        setTimeout(() => {
            this.getMap().invalidateSize(true);
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

    private updateMap() {
        forEach(this.deviceList, dl => {
            if (dl.lastLatitude && dl.lastLongitude) {
                this.markersCluster.addLayer(dl.marker);
            }
            this.popupLink.register(dl.marker, dl, (_sdevice, _smarker) => {
                this.currentMarker = _smarker;
                this.selectedDevice = _sdevice;
                this.xUpdate();
            });
        });
        this.xUpdate();
    }

    private xUpdate() {
        if (this.selectedMarker) {
            this.selectedMarker.removeFrom(this.getMap());
        }

        if (this.selectedDevice) {
            let center = latLng(this.selectedDevice.lastLatitude, this.selectedDevice.lastLongitude);
            this.selectedMarker = circleMarker(center, {radius: 30}).addTo(this.getMap());
            let oldZoom = this.getMap().getZoom();
            this.getMap().setView(center, oldZoom);
        } else if (this.deviceList.length > 0 ) {
            this.getMap().addLayer(this.markersCluster);
            let bounds: LatLngBounds = this.markersCluster.getBounds();
            if (bounds.isValid()) {
                this.getMap().fitBounds(bounds);
            }

        }
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
        const columns: Array<[string, ...PrimitiveArray]> = [
            ['Live',    this.liveDev.count],
            ['IDLE',    this.idleDev.count],
            ['Stopped', this.stopDev.count],
            ['Dead',    this.deadDev.count],
        ];
        const cols = {
            columns: columns
        };
        this.chart0.load(cols);
        d3.select('#chart0 .c3-chart-arcs-title')
            .attr('font-size', '2em')
            .text(() => this.totalDevice);
    }



    searchDeviceList() {
        this.deviceFilterText = this.deviceFilterText.trim(); // Remove whitespace
        this.deviceList = filter(this.allDeviceList, (dev: Device) => {
            return (dev.name && includes(dev.name, this.deviceFilterText)) ||
                (dev.deviceId && includes(dev.deviceId, this.deviceFilterText)) ||
                (dev.lastAddress && includes(dev.lastAddress, this.deviceFilterText));
        });
    }

    getMap(): Map {
        if (!this.map) {
            this.map = lmap('map1', {
                zoomControl: false,
                center: latLng(21.731253, 105.996139),
                zoom: 12,
                minZoom: 1,
                maxZoom: 18,

                layers: [
                    tileLayer(TILE_MAPBOX, {
                        attribution: '&copy; <a href="https://gpshandle.com">gpshandle.com</a>',
                    })]
            });

            control.scale().addTo(this.map);
            control.zoom().setPosition('bottomleft').addTo(this.map);
        }

        return this.map;
    }
}
