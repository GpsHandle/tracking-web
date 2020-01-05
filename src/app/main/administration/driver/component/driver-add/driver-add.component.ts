import { Component, OnInit } from '@angular/core';
import {Driver} from "../../../../../models/driver";
import {ApplicationContext} from "../../../../../application-context";
import {DriverService} from "../../../../../services/driver.service";

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.scss']
})
export class DriverAddComponent implements OnInit {
    data: Driver;

  constructor(private applicationContext: ApplicationContext, private driverService: DriverService) { }

  ngOnInit() {
      this.data = {} as Driver;
  }

    save() {
      this.applicationContext.spin(true);
        this.driverService.create(this.data).subscribe(
            data => {
                this.applicationContext.spin(false);
                this.applicationContext.info('A driver record was created!');
                this.applicationContext.navigate(['/main/admin/driver']);
            }
        )
    }

    cancel() {

    }
}
