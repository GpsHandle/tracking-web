import { Injectable } from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route,
    CanActivateChild, Router, NavigationExtras
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ApplicationContext} from 'app/application-context';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private applicationContext: ApplicationContext, private router: Router) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.checkLogin(state.url);
    }
    checkLogin(url: string): boolean {
        if (this.applicationContext.isLoggedIn()) {
            return true;
        }

        // store the attempted URL for redirecting
        this.applicationContext.redirectURL = url;
        // create session_id
        const sessionId = 12345567;
        // Set our navigation extras object
        // that contains our global query params and fragment
        const navigationExtras: NavigationExtras = {
            queryParams: { 'session_id': sessionId },
            fragment: 'anchor'
        }
        this.router.navigate(['/login'], navigationExtras);
        return false;
    }
}
