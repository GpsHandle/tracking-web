import {SideNavState} from './main-store/main.models';
import {
    initialState as sideNavInitialState, reducerSideNav,
} from './main-store/main.reducer'

export const ROOT_FEATURE_KEY = 'rootTracking'

export interface RootState {
    sideNavState: SideNavState
}

export interface RootPartialState {
    readonly [ROOT_FEATURE_KEY]: RootState
}

export const initialState: RootState = {
    sideNavState: sideNavInitialState,
}

export function rootReducer(s: RootState = initialState, a: any): RootState {
    return {
        ...s,
        sideNavState: reducerSideNav(s.sideNavState, a),
    }
}
