import {SideNavState} from './main.models';
import {Action, createReducer, on} from '@ngrx/store';
import * as SideNavActions from './main.actions';

export const initialState: SideNavState = {
    opened: true,
    mode: 'side'
};

const SideNavReducer = createReducer(
    initialState,
    on(
        SideNavActions.SetPcSidenav,
        state => ({...state, mode: 'side', opened: true})
    ),
    on(SideNavActions.SetMobileSidenav, state => ({...state, opened: false, mode: 'over'})),
    on(SideNavActions.ToggleSidenav, state => ({...state, opened: !state.opened})),
    on(SideNavActions.HideOverSidenav, state => {
        if (state.mode === 'over') {
            return {
                ...state,
                opened: false
            }
        }
    }),
);

export function reducerSideNav(state: SideNavState | undefined, action: Action) {
    return SideNavReducer(state, action);
}
