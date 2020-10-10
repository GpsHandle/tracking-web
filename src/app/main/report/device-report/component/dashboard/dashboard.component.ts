import {Component, OnInit} from '@angular/core';
import {ChartAPI, PrimitiveArray} from 'c3';
import * as c3 from 'c3';
import * as d3 from 'd3';
import {map as _map} from 'lodash-es';
import {Device} from "../../../../../models/device";
import {StatusPieChart} from "../../../../../models/status-pie-chart";
import {DashboardService} from "../../service/dashboard.service";
import {MappingUtils} from "../../../../tracking/live/mapping-utils";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private chart0: ChartAPI;
    private deviceList: Device[];
    private totalDevice: number;
    private liveDev = new StatusPieChart(1, 'Live', 0);
    private idleDev = new StatusPieChart(2, 'Idle', 0);
    private stopDev = new StatusPieChart(3, 'Stop', 0);
    private deadDev = new StatusPieChart(3, 'Dead', 0);


    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.dashboardService.deviceList$.subscribe(devices => {
            this.totalDevice = devices.length;
            this.deviceList = devices;

            this.deviceList = _map(devices, (device) => {
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

            setTimeout(() => {
                this.draw();
            })
        });
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
                    ['Live', this.liveDev.count],
                    ['IDLE', this.idleDev.count],
                    ['Stopped', this.stopDev.count],
                    ['Dead', this.deadDev.count],
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
                        return value + '(' + d3.format('.0%')(ratio) + ')';
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
            ['Live', this.liveDev.count],
            ['IDLE', this.idleDev.count],
            ['Stopped', this.stopDev.count],
            ['Dead', this.deadDev.count],
        ];
        const cols = {
            columns: columns
        };
        this.chart0.load(cols);
        d3.select('#chart0 .c3-chart-arcs-title')
            .attr('font-size', '2em')
            .text(() => this.totalDevice);
    }
}
