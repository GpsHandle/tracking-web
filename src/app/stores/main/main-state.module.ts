import {StoreModule} from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {Effects} from "./effects";
import {mainFeatureKey, reducer} from "./reducer";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(mainFeatureKey, reducer),
        EffectsModule.forFeature([Effects])
    ]
})
export class MainStateModule {}
