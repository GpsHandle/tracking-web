import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ApplicationContext } from 'app/application-context';
import { AlertType } from 'app/models/enums/alert-type.enum';
import { Weekday } from 'app/shared/scheduler/weekday/weekday';
import { DayTime } from 'app/shared/scheduler/daytime/day-time';
import { AlertProfile } from 'app/models/alert-profile';
import { AlertProfileRequest } from 'app/models/request/alert-profile.request';

import { merge, of, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Geozone } from 'app/models/geozone';
import { GeozoneService } from 'app/services/geozone.service';

@Component({
    selector: 'add-edit-alert-profile',
    templateUrl: './add-edit-alert-profile.component.html',
    styleUrls: ['./add-edit-alert-profile.component.scss']
})
export class AddEditAlertProfileComponent implements OnInit {

    isEditing: boolean = false;
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

    @ViewChild(Weekday, { static: true }) weekDays: Weekday;
    @ViewChild(DayTime, { static: true }) dayTime: DayTime;

    constructor(private geozoneService: GeozoneService,
                private applicationContext: ApplicationContext,
                public matDialog: MatDialog,
                public dialogRef: MatDialogRef<AddEditAlertProfileComponent>,
                @Inject(MAT_DIALOG_DATA) public data: AlertProfile | AlertProfileRequest | any) {}

    ngOnInit() {
        this.geozoneService.getAll().subscribe(
            data => {
                this.zoneList = data;
            },
            error => {},
            () => {}
        );

        if (!this.data.name) {
            this.data.catalog = 'eventual';
            this.data.type = AlertType.ALERT_GEOFENCE_IN;
            this.data.active = true;
        }
    }
    onSave() {
        this.data.weekDays = this.weekDays.data;
        this.data.dayTime = this.dayTime.scheduleTime;
        this.dialogRef.close(true);
    }
}
