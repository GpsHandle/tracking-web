import { Component, OnInit } from '@angular/core';
import {AlertProfile} from "../../../../../models/alert-profile";
import {Geozone} from "../../../../../models/geozone";
import {AlertType} from "../../../../../models/enums/alert-type.enum";
import {DaySelected} from "../../../../../shared/scheduler/weekday/weekday";
import {MyTime} from "../../../../../shared/scheduler/daytime/time-input";
import {Router} from "@angular/router";

@Component({
    selector: 'app-alert-profile-add',
    templateUrl: './alert-profile-add.component.html',
    styleUrls: ['./alert-profile-add.component.scss']
})
export class AlertProfileAddComponent implements OnInit {
    isEditing: boolean;
    data: AlertProfile;
    zoneList: Geozone[];

    types: Array<string> = [
        AlertType.ALERT_START,
        AlertType.ALERT_STOP,
        AlertType.ALERT_ENGINE_START,
        AlertType.ALERT_ENGINE_STOP,
        AlertType.ALERT_OVER_SPEED,
        AlertType.ALERT_GEOFENCE_IN,
        AlertType.ALERT_GEOFENCE_OUT,
        AlertType.ALERT_IGNITION_ON,
        AlertType.ALERT_IGNITION_OFF,
        AlertType.ALERT_FUEL_DROP,
        AlertType.ALERT_FUEL_FILL
    ];

    constructor(private router: Router) { }

    ngOnInit() {
        if (!this.data) {
            this.data = {} as AlertProfile;
            this.data.weekDays = {} as DaySelected;
            this.data.dayTime = {} as MyTime;
        }
    }

    edit() {

    }

    save() {

    }

    cancel() {
        this.data = null;
        this.router.navigate(['/main/admin/alert']);
    }
}
