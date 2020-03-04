import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationContext} from 'app/application-context';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {MainFacade} from '../stores/root-store.facade';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    accountName: string;
    // sidenavOpened$: Observable<boolean>;
    // sidenavMode$: Observable<string>;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private ngZone: NgZone,
                private mainFacade: MainFacade,
                private breakpointObserver: BreakpointObserver,
                private app: ApplicationContext,
                private router: Router) {
        window.onresize = (e) => {
            ngZone.run(() => {
                this.handleResizeWindow(window.innerWidth)
            })
        }
    }

    ngOnInit() {
        this.accountName = this.app.accountName;
        this.handleResizeWindow(window.innerWidth);
    }

    private handleResizeWindow(screenWidth: number) {
        if (800 < screenWidth) {
            this.mainFacade.setSideNavForPc();
        } else {
            this.mainFacade.setSideNavForMobile();
        }

        // this.sidenavMode$ = this.mainFacade.sidenavMode$;
        // this.sidenavOpened$ = this.mainFacade.sidenavOpened$;
    }

    ngOnDestroy(): void {
    }

    logout() {
        this.app.logout();
        this.router.navigate(['/login']);
    }

    openSideNavForTracking() {
    }

    openSideNavForReport() {
    }

    openSideNavOnMobile() {
        const urlRoute = this.router.url;
        if (urlRoute.includes('tracking')) {
            return this.mainFacade.openSideNav();
        }
        if (urlRoute.includes('report')) {
            return this.mainFacade.openSideNav();

        }
    }

}
