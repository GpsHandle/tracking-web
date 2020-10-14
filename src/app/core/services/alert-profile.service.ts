import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AlertProfile} from "../../models/alert-profile";
import {AbstractService} from "./abstract.service";
import {AlertProfileRequest} from "../../models/request/alert-profile.request";

export const API_URL = '/api/alert';
@Injectable({
  providedIn: 'root'
})
export class AlertProfileService extends AbstractService<AlertProfileRequest, AlertProfile>{

    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_URL);
    }
}
