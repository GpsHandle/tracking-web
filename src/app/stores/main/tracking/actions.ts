import {createAction, props} from "@ngrx/store";
import {Device} from "../../../models/device";

export enum ActionTypes {
    LOAD_ALL_DEVICES_REQUEST = '[Tracking] Load All Devices Request',
    LOAD_ALL_DEVICES_SUCCESS = '[Tracking] Load All Device Success',
    LOAD_ALL_DEVICES_FAILURE = '[Tracking] Load All Device Failure',

    SET_SELECTED_DEVICE = '[Tracking] Set Device Selected',
}

export const loadAllDevicesRequestAction = createAction(
    ActionTypes.LOAD_ALL_DEVICES_REQUEST
);

export const loadAllDevicesSuccessAction = createAction(
    ActionTypes.LOAD_ALL_DEVICES_SUCCESS,
    props<{devices: Device[]}>()
);

export const loadAllDevicesFailureAction = createAction(
    ActionTypes.LOAD_ALL_DEVICES_FAILURE,
    props<{error: string}>()
);

export const setSelectedDeviceAction = createAction(
    ActionTypes.SET_SELECTED_DEVICE,
    props<{device: Device}>()
);
