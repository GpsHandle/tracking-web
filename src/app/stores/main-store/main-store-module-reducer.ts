import {initialState, State} from "./main-store-module-state";
import {Actions, MainActionTypes} from "./main-store-module-actions";

export function featureReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case MainActionTypes.ACTION1:
            return ;
        case MainActionTypes.ACTION2:
            return ;
        case MainActionTypes.ACTION3:
            return ;
        default:
            return state;
    }
}
