import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OptionalColumnAccountComponent } from '../optional-column-account/optional-column-account.component';
import { merge, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {forOwn, toLower} from "lodash-es";
import {Account} from "../../../../../models/account";
import {ApplicationContext} from "../../../../../application-context";
import {AccountRequest} from "../../../../../models/request/account.request";
import {UniversalStorage} from "../../../../../shared/universal-storage.service";
import {PageableCommonResponse} from "../../../../../models/pageable-common.response";
import {DeleteAccountComponent} from "../delete-account/delete-account.component";
import {AccountService} from "../../../../../services/account.service";
import {AddEditAccountComponent} from "../add-edit-account/add-edit-account.component";

@Component({
    selector: 'applicationContext-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class AccountComponent implements OnInit, AfterViewInit, AfterViewChecked {
    dataSource: MatTableDataSource<Account>;
    dataChange: ReplaySubject<any>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns = ['accountId', 'firstName', 'lastName', 'status', 'notes', 'createdBy', 'createdOn'];
    expandedElement: any;
    columns = {
        id:                 {selected: false, order: 0},
        accountId:          {selected: false, order: 1},
        firstName:          {selected: false, order: 2},
        lastName:           {selected: false, order: 3},
        status:             {selected: false, order: 4},
        phoneNumber:        {selected: false, order: 7},
        photoUrl:           {selected: false, order: 8},
        emailAddress:       {selected: false, order: 9},
        addressLine1:       {selected: false, order: 10},
        addressLine2:       {selected: false, order: 11},
        notes:              {selected: false, order: 12},
        roles:              {selected: false, order: 13},
        createdBy:          {selected: false, order: 13},
        createdOn:          {selected: false, order: 14},
        updatedBy:          {selected: false, order: 15},
        updatedOn:          {selected: false, order: 16},
        actions:            {selected: false, order: 17}
    };

    resultsLength = 0;
    ngNoData: Observable<boolean>;

    constructor(private dialog: MatDialog,
                private myStorage: UniversalStorage,
                private applicationContext: ApplicationContext,
                private service: AccountService) { }

    ngOnInit() {
        this.initTableSettings();
        this.dataChange = new ReplaySubject(1);
        this.dataSource = new MatTableDataSource();
        this.ngNoData = this.dataSource.connect().pipe(map(data => data.length === 0));
    }

    ngAfterViewChecked(): void {

    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.dataSource.sort = this.sort;
        merge(this.sort.sortChange, this.paginator.page, this.dataChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.applicationContext.spin(true)
                    return this.service!.searchAndSort(
                        this.paginator.pageIndex, this.paginator.pageSize,
                        this.sort.active, this.sort.direction);
                }),
                map((data: PageableCommonResponse<Account>) => {
                    this.resultsLength = data.totalElements;
                    return data.content;
                }),
                catchError(() => {
                    return observableOf([]);
                })
            ).subscribe(
            data => {
                this.dataSource.data = data;
                this.applicationContext.spin(false);
            });
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    initTableSettings(): void {
        try {
            const displayeds = JSON.parse(this.myStorage.getItem('acc-disp-cols'));
            if (displayeds != null) {
                this.displayedColumns = displayeds;
            }
        } catch (e) {
            console.log(e);
        }

        // 2. generate new columns
        forOwn(this.columns, (value, key) => {
            if (this.displayedColumns.includes(key)) {
                value.selected = true;
            }
        });
    }

    openDialogColumnOptions(): void {
        const dialogRef = this.dialog.open(OptionalColumnAccountComponent, {
            data: this.columns
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.displayedColumns = [];
                    forOwn(this.columns, (value, key) => {
                        if (value.selected) {
                            this.displayedColumns.push(key);
                        }
                    });
                }
                this.myStorage.setItem('acc-disp-cols', JSON.stringify(this.displayedColumns));
            }
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


    openDialogNewObject(): void {
        const data = new Account();
        const dialogRef = this.dialog.open(AddEditAccountComponent, {
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

    create(account: AccountRequest): void {
        this.service.create(account).subscribe(
            data => {
                this.dataChange.next(data.id);
            },
            error => {
            },
            () => {
            }
        );
    }

    openDialogEditing(data: Account): void {
        console.log('Data', data);
        const dialogRef = this.dialog.open(AddEditAccountComponent, {
            width: '800px',
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.update(data.id, result);
            }
        });
    }

    update(id: number, account: AccountRequest): void {
        this.service.update(id, account).subscribe(
            result => {
                this.applicationContext.info("update account success");
                this.dataChange.next(1);
            },
            (error: HttpErrorResponse) => {
                this.applicationContext.error(error);
            },
            () => {}
        );
    }

    openDialogConfirmDelete(account: Account): void {
        const dialogRef = this.dialog.open(DeleteAccountComponent, {
            disableClose: true,
            minWidth: 350,
            data: account
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._delete(account);
            }
        });
    }

    _delete(account: Account): void {
        this.service._delete(account.id).subscribe(
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

    checkStatus(account: Account): boolean {
        return toLower(account.status) === 'activated';
    }

    toggleStatus(account: Account) {
        if (this.checkStatus(account)) {
            account.status = 'INACTIVATED';
        } else {
            account.status = 'ACTIVATED';
        }

        this.update(account.id, new AccountRequest(account));
    }
}
