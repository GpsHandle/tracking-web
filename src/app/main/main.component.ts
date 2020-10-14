import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {MainFacade} from '../stores/root-store.facade';
import {ApplicationContext} from "../application-context";

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

    oldScreenWidth: number;

    constructor(private ngZone: NgZone,
                private mainFacade: MainFacade,
                private breakpointObserver: BreakpointObserver,
                private app: ApplicationContext,
                private router: Router) {
        // window.onresize = (e) => {
        //     ngZone.run(() => {
        //         this.handleResizeWindow(window.innerWidth)
        //     })
        // }
    }

    ngOnInit() {
        this.accountName = this.app.accountName;
        // this.oldScreenWidth = window.innerWidth;
        // this.handleResizeWindow(window.innerWidth);
    }

    // private handleResizeWindow(screenWidth: number) {
    //     console.log('change Size ...', this.oldScreenWidth, screenWidth)
    //     if (!this.isMobile(screenWidth)) {
    //         this.mainFacade.setSideNavForPc();
    //         this.oldScreenWidth = screenWidth;
    //     } else if (!this.isMobile(this.oldScreenWidth)) {
    //         this.mainFacade.setSideNavForMobile();
    //         this.oldScreenWidth = screenWidth;
    //     }
    //
    //     // this.sidenavMode$ = this.mainFacade.sidenavMode$;
    //     // this.sidenavOpened$ = this.mainFacade.sidenavOpened$;
    // }

    private isMobile(screenWidth: number): boolean {
        return screenWidth < 800;
    }

    ngOnDestroy(): void {
    }

    logout() {
        this.app.logout();
        this.router.navigate(['/account/c/login']);
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
