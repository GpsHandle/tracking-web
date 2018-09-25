import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApplicationContext} from "../application-context";
import {Router} from "@angular/router";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private applicationContext: ApplicationContext) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('/oauth')) {
            const changeReg = req.clone();
            return next.handle(changeReg);
        } else {
                const token = this.applicationContext.getToken();
                const changeReg = req.clone({
                    headers: req.headers.set('Authorization', token)
                });
                return next.handle(changeReg)
                    .pipe(
                        catchError(
                            (err: any, caught: Observable<HttpEvent<any>>) => {
                                if (err.status === 401) {
                                    this.applicationContext.logout();
                                    this.applicationContext.navigate(['/login']);
                                    return of(err);
                                } else if (err.status === 500) {
                                    this.applicationContext.logout();
                                    this.applicationContext.navigate(['/error']);
                                    return of(err)
                                } else {
                                    throw err;
                                }
                            }
                        )
                    );
            }
    }
}
