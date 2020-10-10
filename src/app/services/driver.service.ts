import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {DriverRequest} from "../models/request/driver.request";
import {Driver} from "../models/driver";
import {AbstractService} from "./abstract.service";

const API_DRIVER_PATH = '/api/driver';

@Injectable()
export class DriverService extends AbstractService<DriverRequest, Driver> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DRIVER_PATH);
    }
}
