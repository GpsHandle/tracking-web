import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SideNavActions} from './main';
import {selectNavMode, selectNavOpenned} from "./main/selectors";


@Injectable({
    providedIn: 'root'
})
export class RootFacade {
    sidenavOpened$ = this.store.pipe(select(selectNavOpenned));
    sidenavMode$ = this.store.pipe(select(selectNavMode));

    constructor(private store: Store<{}>) {
    }

    setSideNavForPc() {
        return this.store.dispatch(SideNavActions.setPcSidenav());
    }

    setSideNavForMobile() {
        return this.store.dispatch(SideNavActions.setMobileSidenav());
    }

    openSideNav() {
        return this.store.dispatch(SideNavActions.toggleSidenav());
    }

}
