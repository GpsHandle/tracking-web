import { Component, OnInit, ViewChild } from '@angular/core';
import { Driver } from 'app/models/driver';
import { ApplicationContext } from 'app/application-context';
import { DriverService } from 'app/services/driver.service';
import { merge, of, ReplaySubject } from 'rxjs';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AddEditDriverComponent } from 'app/main/administration/driver/component/add-edit-driver/add-edit-driver.component';
import { DeleteDriverComponent } from 'app/main/administration/driver/component/delete-driver/delete-driver.component';
import { OptionalColumnDriverComponent } from 'app/main/administration/driver/component/optional-column-driver/optional-column-driver.component';
import { DriverRequest } from 'app/models/request/driver.request';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class DriverComponent implements OnInit {
    dataSource: Array<Driver>;
    change: ReplaySubject<any>;

    expandedElement: Driver;

    resultsLength = 0;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns = ['id', 'name', 'dateOfBirth', 'driverExperiencesMonths', 'typeOfVehicleExperienced',
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

    isExpanded(element: any): boolean {
        return this.expandedElement === element;
    }

    toggleExpandCollapse(element): void {
        if (this.isExpanded(element)) {
            this.expandedElement = null;
        } else {
            this.expandedElement = element;
        }
    }


    dialogNewDriver() {
        const driver = new DriverRequest();
        const dialogRef = this.dialog.open(AddEditDriverComponent, {
            minWidth: 500,
            data: driver
        });
        dialogRef.afterClosed().subscribe(
            data => {
                console.log('Creating driver#', driver);
                if (data) {
                    this.createDriver(driver);
                }
            },
            error => {},
            () => {}
        )
    }

    createDriver(driver: DriverRequest) {
        this.applicationContext.spin(true);
        this.driverService.create(driver).subscribe(
            data => {
                this.applicationContext.info("Created a driver!");
            },
            error => {
                this.applicationContext.error("Not able to create driver for now");
            },
            () => {
                this.change.next(1);
            }
        );
    }

    dialogEditing(driver: Driver) {

    }

    dialogDeleteDriver(driver: Driver) {
        const dialogRef = this.dialog.open(DeleteDriverComponent, {

        });

        dialogRef.afterClosed().subscribe(
            data => {},
            error => {},
            () => {}
        );
    }
}
