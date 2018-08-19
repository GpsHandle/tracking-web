import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ApplicationContext } from 'app/application-context';
import { Observable } from 'rxjs/Observable';
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

@Component({
    selector: 'add-edit-alert-profile',
    templateUrl: './add-edit-alert-profile.component.html',
    styleUrls: ['./add-edit-alert-profile.component.scss']
})
export class AddEditAlertProfileComponent implements OnInit {

    isEditing: boolean = false;
    contactList: Observable<Contact[]>;
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

    @ViewChild(Weekday) weekDays: Weekday;
    @ViewChild(DayTime) dayTime: DayTime;

    constructor(private contactService: ContactService,
                private applicationContext: ApplicationContext,
                public matDialog: MatDialog,
                public dialogRef: MatDialogRef<AddEditAlertProfileComponent>,
                @Inject(MAT_DIALOG_DATA) public data: AlertProfile | AlertProfileRequest | any) {}

    ngOnInit() {
        this.contactList = this.contactService.getAll();

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
                    //TODO
                    //this.create(contact);
                }
            }
        );
    }

    onSave() {
        this.data.weekDays = this.weekDays.data;
        this.data.dayTime = this.dayTime.scheduleTime;
        this.dialogRef.close(true);
    }
}
