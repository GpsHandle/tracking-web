import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Dcs} from "../../models/dcs";
import {AbstractService} from "./abstract.service";
import {DcsRequest} from "../../models/request/dcs.request";

const API_DCS_PATH = '/api/dcs';

@Injectable()
export class DcsService extends AbstractService<DcsRequest, Dcs> {

    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DCS_PATH);
    }

}
