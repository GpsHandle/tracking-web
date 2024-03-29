import { AbstractService } from 'app/services/abstract.service';
import { Injectable } from '@angular/core';
import { DcsRequest } from 'app/models/request/dcs.request';
import { Dcs } from 'app/models/dcs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_DCS_PATH = '/api/dcs';

@Injectable()
export class DcsService extends AbstractService<DcsRequest, Dcs> {

    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DCS_PATH);
    }

}