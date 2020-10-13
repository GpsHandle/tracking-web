import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

import {includes} from 'lodash-es';
import {ApplicationContext} from "../../application-context";

@Injectable({
  providedIn: 'root'
})
export class SysAdminGuard implements CanActivate, CanLoad {
    constructor(private applicationContext: ApplicationContext) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if ( this.checkSystemRole()) {
          return true;
      } else {
          this.applicationContext.navigate(['/not-found']);
          return false;
      }
  }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkSystemRole();
    }

    private checkSystemRole(): boolean {
        return (includes(this.applicationContext.authorities, 'SUPER') ||
            includes(this.applicationContext.authorities, 'SYSADMIN'));
    }
}
