import {Injectable} from '@angular/core';
import {RootPartialState} from './root-store.reducer';
import {select, Store} from '@ngrx/store';
import {SideNavActions} from './main-store';
import {rootQuery} from './root-store.selectors';


@Injectable({
    providedIn: 'root'
})
export class MainFacade {
    sidenavOpened$ = this.store.pipe(select(rootQuery.getSidenavOpened));
    sidenavMode$ = this.store.pipe(select(rootQuery.getSidenavMode));

    constructor(private store: Store<RootPartialState>) {
    }

    setSideNavForPc() {
        return this.store.dispatch(SideNavActions.SetPcSidenav());
    }

    setSideNavForMobile() {
        return this.store.dispatch(SideNavActions.SetMobileSidenav());
    }

    openSideNav() {
        return this.store.dispatch(SideNavActions.ToggleSidenav());
    }

}
