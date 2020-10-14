import { Component, OnInit } from '@angular/core';
import {Driver} from "../../../../../models/driver";
import {switchMap} from "rxjs/operators";
import {ApplicationContext} from "../../../../../application-context";
import {ActivatedRoute} from "@angular/router";
import {DriverService} from "../../../../../core/services/driver.service";

@Component({
  selector: 'app-driver-view-edit',
  templateUrl: './driver-view-edit.component.html',
  styleUrls: ['./driver-view-edit.component.scss']
})
export class DriverViewEditComponent implements OnInit {
    data: Driver;
    driverId: number;

  constructor(private applicationContext: ApplicationContext,
              private route: ActivatedRoute,
              private driverService: DriverService) { }

  ngOnInit() {
      this.data = {} as Driver;
      this.route.params.pipe(
          switchMap(params => {
              this.driverId = params['id'];
              return this.driverService.getById(this.driverId)
          })
      ).subscribe(data => {
          this.data = data;
      });
  }

    save() {

    }

    cancel() {
        this.data = null;
        this.applicationContext.navigate(['/main/admin/driver']);
    }
}
