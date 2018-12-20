import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationContext } from 'app/application-context';

@Injectable({
    providedIn: 'root'
})
export class DemoGuard implements CanActivate {
    constructor(private applicationContext: ApplicationContext, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.applicationContext.isDemo();
    }
}
