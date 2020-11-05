import { createAction } from '@ngrx/store';

export enum SidenavActionTypes {
    SET_PC_SIDENAV              = '[Sidenav] Set pc sidenav',
    SET_MOBILE_SIDENAV          = '[Sidenav] Set mobile sidenav',
    TOGGLE_SIDENAV              = '[Sidenav] toggle sidenav',
    HIDE_OVER_SIDENAV           = '[Sidenav] hide over sidenav',
}


export const setPcSidenav  = createAction(
    SidenavActionTypes.SET_PC_SIDENAV);

export const setMobileSidenav = createAction(
    SidenavActionTypes.SET_MOBILE_SIDENAV);

export const toggleSidenav = createAction(
    SidenavActionTypes.TOGGLE_SIDENAV
);

export const hideOverSidenav = createAction(
    SidenavActionTypes.HIDE_OVER_SIDENAV
);
