import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertProfile} from "../../../../../models/alert-profile";
import {switchMap} from "rxjs/operators";
import {ApplicationContext} from "../../../../../application-context";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AlertProfileService} from "../../../../../core/services/alert-profile.service";
import {Weekday} from "../../../../../shared/scheduler/weekday/weekday";
import {DayTime} from "../../../../../shared/scheduler/daytime/day-time";
import {AlertType} from "../../../../../models/enums/alert-type.enum";

@Component({
    selector: 'app-alert-profile-edit',
    templateUrl: './alert-profile-edit.component.html',
    styleUrls: ['./alert-profile-edit.component.scss']
})
export class AlertProfileEditComponent implements OnInit {
    data: AlertProfile;
    isEditing: boolean;
    zoneList: any;
    alertId: number;

    @ViewChild(Weekday, { static: true }) weekDays: Weekday;
    @ViewChild(DayTime, { static: true }) dayTime: DayTime;
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
    constructor(private applicationContext: ApplicationContext,
                private route: ActivatedRoute,
                private alertProfileService: AlertProfileService) { }

    ngOnInit() {
        this.data = new AlertProfile();
        this.route.params.pipe(
            switchMap(params => {
                this.alertId = params['id'];
                return this.alertProfileService.getById(this.alertId)
            })
        ).subscribe(data => {
            this.data = data;
            //this.statusControl.setValue(this.data.status);
        });
    }

    edit() {
        this.isEditing = true;
    }

    save() {
        this.data.weekDays = this.weekDays.data;
        this.data.dayTime = this.dayTime.scheduleTime;

        this.applicationContext.spin(true);
        this.alertProfileService.update(this.alertId, this.data).subscribe(
            resp => {
                this.applicationContext.info('Alert Profile #' + this.data + ' has beean updated!');
                this.applicationContext.spin(false);
            },
            error => {
                this.applicationContext.spin(false);
                this.applicationContext.error(error);
            },
            () => {
                //this.change.next();
            }
        );
    }

    cancel() {
        this.isEditing = false;
    }
}
