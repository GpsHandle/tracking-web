import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {ROOT_FEATURE_KEY,  initialState as rootInitialState,
    rootReducer} from './root-store.reducer';
import {EffectsModule} from '@ngrx/effects';

export function getInitialState() {
    return rootInitialState
}
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(ROOT_FEATURE_KEY, rootReducer, {initialState: getInitialState}),
        // EffectsModule.forFeature([])
    ]
})
export class RootStoreModule {
}
