import {State} from "./main-store-module-state";
import {createFeatureSelector, MemoizedSelector} from "@ngrx/store";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectMainState: MemoizedSelector<object, State> = createFeatureSelector<State>('mainModule');

