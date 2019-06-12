import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ApplicationContext } from 'app/application-context';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlertProfileService } from 'app/services/alert-profile.service';
import { ContactService } from 'app/services/contact.service';
import { Contact } from 'app/models/contact';
import { AlertType } from 'app/models/enums/alert-type.enum';
import { Weekday } from 'app/shared/scheduler/weekday/weekday';
import { DayTime } from 'app/shared/scheduler/daytime/day-time';
import { AlertProfile } from 'app/models/alert-profile';
import { AlertProfileRequest } from 'app/models/request/alert-profile.request';
import { AddEditContactComponent } from 'app/main/administration/contact/add-edit-contact/add-edit-contact.component';
import { ContactRequest } from 'app/models/request/contact.request';
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
    contactList: Contact[];
    zoneList: Geozone[];

    types: Array<AlertType> = [
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

    contactChanged: ReplaySubject<any>;

    constructor(private contactService: ContactService,
                private geozoneService: GeozoneService,
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


        this.contactChanged = new ReplaySubject(1);
        merge(this.contactChanged)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.applicationContext.spin(true);
                return this.contactService.getAll();
            }),
            map(data => {
                this.applicationContext.spin(false);
               return data;
            }),
            catchError(() => {
                this.applicationContext.spin(false);
                return of([]);
            })
        ).subscribe(data => this.contactList = data);
    }

    dialogToAddContact(event: Event) {
        event.stopPropagation();

        const contact = new Contact();
        const contactRef = this.matDialog.open(AddEditContactComponent, {
            width: '800px',
            data: contact
        });
        contactRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.createContact(contact);
                }
            }
        );
    }
    createContact(contact: Contact): void {
        this.contactService.create(contact).subscribe(
            data => {
                this.applicationContext.info('Contact #' + contact.name + 'has been created!');
                this.contactChanged.next();
            },
            error => {},
            () => {}
        );
    }

    onSave() {
        this.data.weekDays = this.weekDays.data;
        this.data.dayTime = this.dayTime.scheduleTime;
        this.dialogRef.close(true);
    }
}
