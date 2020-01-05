import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertProfile} from "../../../../../models/alert-profile";
import {Geozone} from "../../../../../models/geozone";
import {AlertType} from "../../../../../models/enums/alert-type.enum";
import {DaySelected, Weekday} from "../../../../../shared/scheduler/weekday/weekday";
import {MyTime} from "../../../../../shared/scheduler/daytime/time-input";
import {Router} from "@angular/router";
import {DayTime} from "../../../../../shared/scheduler/daytime/day-time";
import {GeozoneService} from "../../../../../services/geozone.service";
import {ApplicationContext} from "../../../../../application-context";
import {AlertProfileService} from "../../../../../services/alert-profile.service";

@Component({
    selector: 'app-alert-profile-add',
    templateUrl: './alert-profile-add.component.html',
    styleUrls: ['./alert-profile-add.component.scss']
})
export class AlertProfileAddComponent implements OnInit {
    isEditing: boolean;
    data: AlertProfile;
    zoneList: Geozone[];
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
                private alertProfileService: AlertProfileService,
                private geozoneService: GeozoneService, private router: Router) { }

    ngOnInit() {
        this.geozoneService.getAll().subscribe(
            data => {
                this.zoneList = data;
            },
            error => {},
            () => {}
        );
        if (!this.data) {
            this.data = {} as AlertProfile;
            this.data.weekDays = {} as DaySelected;
            this.data.dayTime = {} as MyTime;
        }
    }

    edit() {

    }

    save() {
        this.data.weekDays = this.weekDays.data;
        this.data.dayTime = this.dayTime.scheduleTime;

        this.applicationContext.spin(true);
        this.alertProfileService.create(this.data).subscribe(
            response => {
                this.applicationContext.spin(false);
                this.applicationContext.info('An alert profile was created');
            },
            error => {},
            () => {
                // this.change.next();
            }
        );
    }

    cancel() {
        this.data = null;
        this.router.navigate(['/main/admin/alert']);
    }
}
