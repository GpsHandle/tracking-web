import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ROOT_FEATURE_KEY, RootState} from './root-store.reducer'

// Lookup the 'RootState' feature state managed by NgRx
const getRootState = createFeatureSelector<RootState>(ROOT_FEATURE_KEY);
export const getSidenavOpened = createSelector(
    getRootState,
    (state: RootState) => state.sideNavState.opened
);
export const getSidenavMode = createSelector(
    getRootState,
    (state: RootState) => state.sideNavState.mode
);
export const rootQuery = {
    getSidenavOpened,
    getSidenavMode,
};
