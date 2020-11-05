import {State} from "./state";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {mainFeatureKey} from "./reducer";


const getNavOpenned = (state: State) => state.opened;
const getNavMode = (state: State) => state.mode;

export const selectNavState = createFeatureSelector(mainFeatureKey);
export const selectNavOpenned = createSelector(selectNavState, getNavOpenned);
export const selectNavMode = createSelector(selectNavState, getNavMode);
