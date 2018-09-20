import { Component, OnInit, ViewChild } from '@angular/core';
import { Driver } from 'app/models/driver';
import { ApplicationContext } from 'app/application-context';
import { DriverService } from 'app/services/driver.service';
import { merge, of, ReplaySubject } from 'rxjs';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AddEditDriverComponent } from 'app/main/administration/driver/add-edit-driver/add-edit-driver.component';
import { DeleteDriverComponent } from 'app/main/administration/driver/delete-driver/delete-driver.component';
import { OptionalColumnDriverComponent } from 'app/main/administration/driver/optional-column-driver/optional-column-driver.component';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
    dataSource: Array<Driver>;
    change: ReplaySubject<any>;

    expandedElement: Driver;

    resultsLength = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['id', 'name', 'contacts', 'dateOfBirth', 'driverExperiencesMonths', 'typeOfVehicleExperienced',
    'driverLicenseNumber', 'driverLicenseType', 'driverLicenseTypeDescription', 'driverLicenseIssueDate', 'driverLicenseExpiredDate',
    'createdBy', 'createdOn', 'updatedBy', 'updatedOn'];
    constructor(private applicationContext: ApplicationContext,
                private driverService: DriverService,
                private dialog: MatDialog) { }

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
                return this.driverService!.searchAndSort(
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
        });
    }

    applyFilter(filterValue: string) {
        // filterValue = filterValue.trim(); // Remove whitespace
        // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        // this.dataSource.filter = filterValue;
    }

    dialogOptionalColumn() {
        const dialogRef = this.dialog.open(OptionalColumnDriverComponent, {});
        dialogRef.afterClosed().subscribe(
            data => {},
            error => {},
            () => {}
        );
    }

    dialogNewDriver() {
        const dialogRef = this.dialog.open(AddEditDriverComponent, {
            minWidth: 500,
            data: new Driver()
        });
        dialogRef.afterClosed().subscribe(
            data => {},
            error => {},
            () => {}
        )
    }

    dialogDeleteDriver() {
        const dialogRef = this.dialog.open(DeleteDriverComponent, {

        });

        dialogRef.afterClosed().subscribe(
            data => {},
            error => {},
            () => {}
        );
    }
}
