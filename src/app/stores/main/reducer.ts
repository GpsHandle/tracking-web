import {State} from './state';
import {Action, createReducer, on} from '@ngrx/store';
import * as SideNavActions from './actions';

export const mainFeatureKey = 'mainFeatureKey';

export const initialState: State = {
    opened: true,
    mode: 'side'
};

const sideNavReducer = createReducer(
    initialState,
    on(SideNavActions.setPcSidenav, state => ({...state, mode: 'side', opened: true})),
    on(SideNavActions.setMobileSidenav, state => ({...state, opened: false, mode: 'over'})),
    on(SideNavActions.toggleSidenav, state => ({...state, opened: !state.opened})),
    on(SideNavActions.hideOverSidenav, state => {
        if (state.mode === 'over') {
            return {
                ...state,
                opened: false
            }
        }
    }),
);

export function reducer(state: State | undefined, action: Action) {
    return sideNavReducer(state, action);
}
