import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AddEditContactComponent } from 'app/main/administration/contact/add-edit-contact/add-edit-contact.component';
import { OptionalColumnContactComponent } from 'app/main/administration/contact/optional-column-contact/optional-column-contact.component';
import { Contact } from 'app/models/contact';
import { ContactRequest } from 'app/models/request/contact.request';
import { ContactService } from 'app/services/contact.service';
import { merge, of, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApplicationContext } from 'app/application-context';
import { DeleteContactComponent } from 'app/main/administration/contact/delete-contact/delete-contact.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    dataSource: Array<Contact>;
    change: ReplaySubject<any>;

    displayedColumns: string[] = ['name', 'description', 'firstName', 'lastName', 'title', 'phoneNumber',
        'emailAddress', 'addressLine1', 'addressLine2', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'actions'];
    resultsLength = 0;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(public dialog: MatDialog, private contactService: ContactService,
                private applicationContext: ApplicationContext) { }

    ngOnInit() {
        this.change = new ReplaySubject(1);
        this.sort.sortChange.subscribe(() => {
            this.paginator.pageIndex = 0;
        });
        merge(this.sort.sortChange, this.paginator.page, this.change)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.applicationContext.spin(true);
                return this.contactService!.searchAndSort(
                    this.paginator.pageIndex, this.paginator.pageSize,
                    this.sort.active, this.sort.direction);
            }),
            map(data => {
                this.applicationContext.spin(false);
                this.resultsLength = data.totalElements;
                return data.content;
            }),
            catchError(() => {
                this.applicationContext.spin(false);
                return of([]);
            })
        ).subscribe(data => {
            this.dataSource = data;
        })
    }

    dialogColumnOptions() {
        const dialogRef = this.dialog.open(OptionalColumnContactComponent, {
            //
        });
        dialogRef.afterClosed().subscribe(
            result => {}
        )
    }

    dialogNewContact() {
        const contact = new Contact();
        const dialogRef = this.dialog.open(AddEditContactComponent, {
           width: '800px',
            data: contact
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.create(contact);
                }
            }
        )
    }

    create(data: ContactRequest | Contact): void {
        if (data) {
            this.applicationContext.spin(true)
            this.contactService.create(data).subscribe(
                resp => {
                    this.applicationContext.spin(false)
                    this.applicationContext.info('A contact has been created');
                    this.change.next();
                },
                error => {
                    this.applicationContext.spin(false);
                    this.applicationContext.info('An error occured while creating contact');
                }
            );
        }
    }

    dialogEditContact(contact: Contact) {
        const dialogRef = this.dialog.open(AddEditContactComponent, {
            width: '800px',
            data: contact
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.update(contact);
                }
            }
        )
    }

    update(data: Contact): void {
        if (data) {
            this.applicationContext.spin(true);
            this.contactService.update(data.id, data).subscribe(
                resp => {
                    this.applicationContext.spin(false);
                    this.applicationContext.info('A contact has been updated');
                    this.change.next();
                },
                error => {
                    this.applicationContext.spin(false);
                    this.applicationContext.info('An error occured while creating contact');
                }
            );
        }
    }

    dialogDelete(contact: Contact | any) {
        const dialogRef = this.dialog.open(DeleteContactComponent, {
            data: contact.name
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.delete(contact.id);
                }
            }
        )
    }

    delete(id: number): void {
        this.contactService._delete(id).subscribe(
            data => {
                this.change.next();
            }
        )
    }

    applyFilter(value: any) {

    }
}


