import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Company } from 'app/models/company';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApplicationContext } from 'app/application-context';
import { CompanyService } from 'app/services/company.service';
import { DeleteEvent } from 'app/models/delete-event';
import { OptionalColumnCompanyComponent } from 'app/main/administration/company/optional-column-company/optional-column-company.component';
import { AddEditCompanyComponent } from 'app/main/administration/company/add-edit-company/add-edit-company.component';
import { merge, ReplaySubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { DeleteCompanyComponent } from 'app/main/administration/company/delete-company/delete-company.component';

@Component({
    selector: 'applicationContext-organization',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, AfterViewInit {

    dataSource: MatTableDataSource<Company> | null;
    dataChange: ReplaySubject<number>;
    resultsLength = 0;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns = ['name', 'emailAddress', 'phoneNumber', 'addressLine1', 'addressLine2', 'createdBy', 'createdOn', 'actions'];

    columns = {
        id:                 {selected: false, order: 0},
        name:               {selected: false, order: 1},
        phoneNumber:        {selected: false, order: 7},
        photoUrl:           {selected: false, order: 8},
        emailAddress:       {selected: false, order: 9},
        addressLine1:       {selected: false, order: 10},
        addressLine2:       {selected: false, order: 11},
        createdBy:          {selected: false, order: 13},
        createdOn:          {selected: false, order: 14},
        updatedBy:          {selected: false, order: 15},
        updatedOn:          {selected: false, order: 16},
        actions:            {selected: false, order: 17}
    };

    constructor(private dialog: MatDialog,
                private applicationContext: ApplicationContext,
                private service: CompanyService) { }

    ngOnInit() {
        this.initTableSettings();
        this.dataChange = new ReplaySubject(1);
        this.dataSource = new MatTableDataSource();
    }
    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;

        merge(this.sort.sortChange, this.paginator.page, this.dataChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.applicationContext.spin(true);
                    return this.service!.searchAndSort(
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
                    return observableOf([]);
                })
            ).subscribe(data => this.dataSource.data = data);
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    initTableSettings(): void {
        try {
            const displayeds = JSON.parse(localStorage.getItem('org-disp-cols'));
            if (displayeds != null) {
                this.displayedColumns = displayeds;
            }
        } catch (e) {
            console.log(e);
        }

        // 2. generate new columns
        _.forOwn(this.columns, (value, key) => {
            if (this.displayedColumns.includes(key)) {
                value.selected = true;
            }
        });
    }

    openDialogColumnOptions(): void {
        const dialogRef = this.dialog.open(OptionalColumnCompanyComponent, {
            data: this.columns
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.displayedColumns = [];
                    _.forOwn(this.columns, (value, key) => {
                        if (value.selected) {
                            this.displayedColumns.push(key);
                        }
                    });
                }
                localStorage.setItem('org-disp-cols', JSON.stringify(this.displayedColumns));
            }
        );
    }

    openDialogNewObject(): void {
        const data = new Company();
        const dialogRef = this.dialog.open(AddEditCompanyComponent, {
            width: '800px',
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.create(result);
            }
        });
    }

    create(organiation: Company): void {
        this.service.create(organiation).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

    openDialogEditing(data: Company): void {
        const dialogRef = this.dialog.open(AddEditCompanyComponent, {
            // width: '600px',
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.update(result);
            }
        });
    }

    update(organization: Company): void {
        this.service.update(organization.id, organization).subscribe(
            data => {},
            error => {},
            () => {
                this.dataChange.next(organization.id);
            }
        );
    }

    openDialogConfirmDelete(organization: Company): void {
        const data = new DeleteEvent();
        data.setId(organization.id);
        data.setName(organization.name);
        data.setType('Company');
        const dialogRef = this.dialog.open(DeleteCompanyComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._delete(result);
            }
        });
    }

    _delete(organization: Company): void {
        this.service._delete(organization.id).subscribe(
            data => {
                this.dataChange.next(0);
            },
            error => {
                this.dataChange.next(error);
            },
            () => {
                this.dataChange.next(1);
            }
        );
    }

}
