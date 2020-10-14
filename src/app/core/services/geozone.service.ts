import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {GeozoneRequest} from "../../models/request/geozone.request";
import {Geozone} from "../../models/geozone";
import {AbstractService} from "./abstract.service";

const API_GEOZONE_PATH = "/api/geofence";

@Injectable()
export class GeozoneService extends AbstractService<GeozoneRequest, Geozone> {

  constructor(private http: HttpClient, private router: Router) {
      super(http, router, API_GEOZONE_PATH);
  }

}
