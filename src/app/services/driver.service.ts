import { Injectable } from '@angular/core';
import { AbstractService } from 'app/services/abstract.service';
import { Driver } from 'app/models/driver';
import { DriverRequest } from 'app/models/request/driver.request';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_DRIVER_PATH = '/api/driver';

@Injectable()
export class DriverService extends AbstractService<DriverRequest, Driver> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DRIVER_PATH);
    }
}