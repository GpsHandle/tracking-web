import { Injectable } from '@angular/core';
import { AbstractService } from 'app/services/abstract.service';
import { GeozoneRequest } from 'app/models/request/geozone.request';
import { Geozone } from 'app/models/geozone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_GEOZONE_PATH = "/api/geofence";

@Injectable()
export class GeozoneService extends AbstractService<GeozoneRequest, Geozone> {

  constructor(private http: HttpClient, private router: Router) {
      super(http, router, API_GEOZONE_PATH);
  }

}
