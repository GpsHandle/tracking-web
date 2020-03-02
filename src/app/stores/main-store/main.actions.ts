import { createAction } from '@ngrx/store';

export enum SidenavActionTypes {
    SET_PC_SIDENAV = '[Sidenav] Set pc sidenav',
    SET_MOBILE_SIDENAV = '[Sidenav] Set mobile sidenav',
    TOGGLE_SIDENAV = '[Sidenav] toggle sidenav',
    HIDE_OVER_SIDENAV = '[Sidenav] hide over sidenav',
}


export const SetPcSidenav  = createAction(
    SidenavActionTypes.SET_PC_SIDENAV);

export const SetMobileSidenav = createAction(
    SidenavActionTypes.SET_MOBILE_SIDENAV);

export const ToggleSidenav = createAction(
    SidenavActionTypes.TOGGLE_SIDENAV
);

export const HideOverSidenav = createAction(
    SidenavActionTypes.HIDE_OVER_SIDENAV
);
