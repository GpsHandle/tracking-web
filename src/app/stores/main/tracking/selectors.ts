import {createFeatureSelector, createSelector} from "@ngrx/store";
import {trackingFeatureKey} from "./reducer";
import {State} from "./state";
import {Device} from "../../../models/device";

const getError = (state: State) => state.error;
const getLoading = (state: State) => state.loading;
const getSelected = (state: State) => state.selected;
const getDevices = (state: State) => state.allDevices;

export const getTrackingState = createFeatureSelector(trackingFeatureKey);
export const getTrackingError = createSelector(getTrackingState, getError);
export const getTrackingSelected = createSelector(getTrackingState, getSelected);
export const getTrackingLoading = createSelector(getTrackingState, getLoading);
export const getTrackingDeviceList = createSelector(getTrackingState, getDevices);

export const getTracking = createSelector(
    getTrackingError,
    getTrackingLoading,
    getTrackingSelected,
    getTrackingDeviceList,
    (error: string, loading: boolean, selected: Device, deviceList: Device[]) => ({
        error, loading, selected, deviceList
    })
)
