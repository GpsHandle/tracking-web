import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {RootFacade} from '../stores/root.facade';
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
                private mainFacade: RootFacade,
                private breakpointObserver: BreakpointObserver,
                private app: ApplicationContext,
                private router: Router) {
    }

    ngOnInit() {
        this.accountName = this.app.accountName;
    }

    ngOnDestroy(): void {
    }

    logout() {
        this.app.logout();
        this.router.navigate(['/account/c/login']);
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
