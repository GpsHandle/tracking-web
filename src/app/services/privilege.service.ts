import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Privilege} from "../models/privilege";
import {BaseService} from "./base.service";
export const PRIVILEGE_API_URL = '/api/privilege';

@Injectable()
export class PrivilegeService extends BaseService<Privilege> {

    constructor(private http: HttpClient, private router: Router) {
        super(http, router, PRIVILEGE_API_URL);
    }
}
