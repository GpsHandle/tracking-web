import {Device} from "../../../models/device";

export interface State {
    loading?: boolean,
    error?: string,
    selected?: Device | undefined, // selected device
    allDevices?: Device[] | undefined,
}

export const initialState: State = {
    loading: false,
    error: null,
    selected: undefined,
    allDevices: undefined
};
