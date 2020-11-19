import {initialState, State} from "./state";
import {Action, createReducer, on} from "@ngrx/store";
import {
    loadAllDevicesFailureAction,
    loadAllDevicesRequestAction,
    loadAllDevicesSuccessAction,
    setSelectedDeviceAction
} from "./actions";

export const trackingFeatureKey = 'tracking-feature-key';

export const trackingReducer = createReducer(
    initialState,
    on(loadAllDevicesRequestAction, (state, action) => ({...state, loading: true, error: null})),
    on(loadAllDevicesSuccessAction, (state, action) => ({...state, loading: false, error: null, allDevices: action.devices})),
    on(loadAllDevicesFailureAction, (state, action) => ({...state, loading: false, error: action.error})),
    on(setSelectedDeviceAction, (state, action) => ({...state, selected: action.device}))
);

export function reducer(state: State | undefined, action: Action) {
    return trackingReducer(state, action);
}
