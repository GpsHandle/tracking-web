import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Driver } from 'app/models/driver';
import { Contact } from 'app/models/contact';
import { merge, of, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ContactService } from 'app/services/contact.service';
import { ApplicationContext } from 'app/application-context';
import { AddEditContactComponent } from 'app/main/administration/contact/add-edit-contact/add-edit-contact.component';

@Component({
    selector: 'app-add-edit-driver',
    templateUrl: './add-edit-driver.component.html',
    styleUrls: ['./add-edit-driver.component.scss']
})
export class AddEditDriverComponent implements OnInit {
    contactList: Contact[];
    contactChanged: ReplaySubject<any>;

    constructor(
        private contactService: ContactService,
        private applicationContext: ApplicationContext,
        public matDialog: MatDialog,
        public dialogRef: MatDialogRef<AddEditDriverComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Driver | any) { }

    ngOnInit() {
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
}
