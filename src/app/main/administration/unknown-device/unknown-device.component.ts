import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UnknownDevice } from 'app/models/unknown-device';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UnknownDeviceService } from 'app/main/administration/unknown-device/service/unknown-device.service';
import { merge, of as observableOf, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApplicationContext } from 'app/application-context';
import { AddNewDeviceComponent } from 'app/main/administration/unknown-device/add-new-device/add-new-device.component';

@Component({
    selector: 'app-unknown-device',
    templateUrl: './unknown-device.component.html',
    styleUrls: ['./unknown-device.component.scss']
})
export class UnknownDeviceComponent implements OnInit, AfterViewInit, AfterViewChecked {

    dataSource: MatTableDataSource<UnknownDevice>;
    dataChange: ReplaySubject<any>;
    resultsLength = 0;
    displayedColumns = ['checkbok', 'uniqueId', 'remoteIpAddress', 'port', 'createdOn', 'actions'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private dialog: MatDialog,
                private unkownDeviceService: UnknownDeviceService,
                private applicationContext: ApplicationContext) { }

    ngOnInit() {
        this.dataChange = new ReplaySubject(1);
        this.dataSource = new MatTableDataSource();
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
                this.applicationContext.spin(true);
                return this.unkownDeviceService.searchAndSort(
                    this.paginator.pageIndex, this.paginator.pageSize,
                    this.sort.active, this.sort.direction);
            }),
            map(data => {
            this.resultsLength = data.totalElements;
            return data.content;
            }),
            catchError(() => {
                return observableOf([]);
            }))
        .subscribe(
            data => {
                this.dataSource.data = data;
                this.applicationContext.spin(false);
            });
    }

    addNewDevice(element: UnknownDevice) {
        const dialogRef = this.dialog.open(AddNewDeviceComponent, {
            width: '800px',
            data: element
        });

        dialogRef.afterClosed().subscribe(result => {
            this.unkownDeviceService.add(result).subscribe(
                data => {},
                error => {},
                () => {}
            );
        });
    }

    addUknDevice(element: UnknownDevice) {
        console.log('UnknownDevice', element)
        this.unkownDeviceService.addUknDevice(element).subscribe(
            data => {
                this.dataChange.next(1);
            },
            error => {},
            () => {}
        );
    }

  addAllUknDevices() {
    console.log('data', this.dataSource.data);
    this.unkownDeviceService.addAllUknDevice().subscribe(
      data => {
        console.log(data);
        this.dataChange.next(1);
      }
    );
  }

  deleteAllUknDevices() {
      console.log('Delete all unknow device');
    this.unkownDeviceService.deleteAllUnknownDevice().subscribe(
      data => {
        this.dataChange.next(1);
      },
      error => {},
      () => {}
    );
  }

  deleteUnknownDevice(element: UnknownDevice) {
    this.unkownDeviceService.deleteUknDevice(element.id).subscribe(
      data => {
        this.dataChange.next(1);
      },
      error => {},
      () => {}
    );
  }
}
