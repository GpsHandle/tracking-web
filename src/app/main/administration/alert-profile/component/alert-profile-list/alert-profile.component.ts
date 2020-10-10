import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {forkJoin, ReplaySubject} from 'rxjs';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {AssignToDeviceComponent} from "../assign-to-device/assign-to-device.component";
import {DeviceService} from "../../../../../services/device.service";
import {Device} from "../../../../../models/device";
import {AddEditAlertProfileComponent} from "../add-edit-alert-profile/add-edit-alert-profile.component";
import {ApplicationContext} from "../../../../../application-context";
import {DeleteAlertProfileComponent} from "../delete-alert-profile/delete-alert-profile.component";
import {PageableCommonResponse} from "../../../../../models/pageable-common.response";
import {AlertProfileService} from "../../../../../services/alert-profile.service";
import {AlertProfileRequest} from "../../../../../models/request/alert-profile.request";
import {AlertProfile} from "../../../../../models/alert-profile";

@Component({
    selector: 'app-alert-profile',
    templateUrl: './alert-profile.component.html',
    styleUrls: ['./alert-profile.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class AlertProfileComponent implements OnInit {

    constructor(public dialog: MatDialog,
                private deviceService: DeviceService,
                private applicationContext: ApplicationContext,
                private alertProfileService: AlertProfileService) { }

    dataSource: Array<AlertProfile>;
    change: ReplaySubject<any>;

    displayedColumns: string[] = ['name', 'description', 'type', 'active',
        'speedKph', 'zoneId', 'params1', 'params2', /*'weekDays', 'dayTime', 'alertEmail', 'alertSms',
        'alertApp', 'cannedAction', */'subject', 'text', 'templateId', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn'];
    expandedElement: any;
    resultsLength = 0;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    devices: Device[];

    ngOnInit() {
        // prepare data
        forkJoin([
            this.deviceService.getAll()
        ]).subscribe(results => {
            this.devices = results[0];
        });


        this.change = new ReplaySubject(1);
        this.sort.sortChange.subscribe(() => {
            this.paginator.pageIndex = 0;
        });
        merge(this.sort.sortChange, this.paginator.page, this.change)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.applicationContext.spin(true);
                return this.alertProfileService!.searchAndSort(
                    this.paginator.pageIndex, this.paginator.pageSize,
                    this.sort.active, this.sort.direction);
            }),
            map((data: PageableCommonResponse<AlertProfile>) => {
                this.applicationContext.spin(false);
                this.resultsLength = data.totalElements;
                return data.content;
            }),
            catchError(() => {
                this.applicationContext.spin(false);
                return of([]);
            })).subscribe(data => this.dataSource = data)
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

    dialogColumnOptions(): void {

    }

    dialogToCreateNewAlertProfile(): void {
        const data = new AlertProfileRequest();
        const dialogRef = this.dialog.open(AddEditAlertProfileComponent, {
            width: '800px',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.create(data);
            }
        });
    }

    create(data: AlertProfileRequest): void {
        this.applicationContext.spin(true);
        this.alertProfileService.create(data).subscribe(
            response => {
                this.applicationContext.spin(false);
                this.applicationContext.info('An alert profile was created');
            },
            error => {},
            () => {
                this.change.next();
            }
        );
    }

    dialogEditAlertProfile(alertProfile: AlertProfile): void {
        const request = AlertProfileRequest.from(alertProfile);
        const dialogRef = this.dialog.open(AddEditAlertProfileComponent, {
            width: '800px',
            data: request
        });

        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.update(alertProfile.id, request);
                }
            }
        );
    }
    update(id: number, request: AlertProfileRequest): void {
        this.applicationContext.spin(true);
        this.alertProfileService.update(id, request).subscribe(
            resp => {
                this.applicationContext.info('Alert Profile #' + id + ' has beean updated!');
                this.applicationContext.spin(false);
            },
            error => {
                this.applicationContext.spin(false);
                this.applicationContext.error(error);
            },
            () => {
                this.change.next();
            }
        );
    }

    dialogDelete(alertProfile: AlertProfile): void {
        const dialogRef = this.dialog.open(DeleteAlertProfileComponent, {
            minWidth: 400,
            data: alertProfile
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(alertProfile);
            }
        });
    }

    delete(alertProfile: AlertProfile): void {
        this.applicationContext.spin(true);
        this.alertProfileService._delete(alertProfile.id).subscribe(
            data => {
                this.applicationContext.spin(false);
                this.change.next();
                this.applicationContext.info('AlertProfile #' + alertProfile.id + 'has been deleted!')
            },
            error => {
                this.applicationContext.error(error);
            },
            () => {});
    }

    applyFilter(value: string) {

    }

    dialogAssignToDevice(alertProfile: AlertProfile): void {
        const dialogRef = this.dialog.open(AssignToDeviceComponent, {
            minWidth: 400,
            data: {
                alert: alertProfile,
                devices: this.devices
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('result', result);
        });
    }
}
