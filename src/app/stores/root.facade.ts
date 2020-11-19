import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SideNavActions} from './main';
import {selectNavMode, selectNavOpenned} from "./main/selectors";
import {loadAllDevicesRequestAction, setSelectedDeviceAction} from "./main/tracking/actions";
import {getTracking} from "./main/tracking/selectors";
import {Device} from "../models/device";


@Injectable({
    providedIn: 'root'
})
export class RootFacade {
    sidenavOpened$ = this.store.pipe(select(selectNavOpenned));
    sidenavMode$ = this.store.pipe(select(selectNavMode));
    trackingState$ = this.store.pipe(select(getTracking));

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

    loadAllDevices() {
        return this.store.dispatch(loadAllDevicesRequestAction())
    }

    selectDevice(device: Device) {
        return this.store.dispatch(setSelectedDeviceAction({selected: device}));
    }

}
