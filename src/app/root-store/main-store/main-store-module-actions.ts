import {Action} from "@ngrx/store";

export enum MainActionTypes {
    ACTION1 = '[Main] Action1',
    ACTION2 = '[Main] Action2',
    ACTION3 = '[Main] Action3',
}

export class LoadRequestAction1 implements Action {
    readonly type = MainActionTypes.ACTION1;
}

export class LoadRequestAction2 implements Action {
    readonly type = MainActionTypes.ACTION2;
}

export class LoadRequestAction3 implements Action {
    readonly type = MainActionTypes.ACTION3;
}

export type Actions = LoadRequestAction1 | LoadRequestAction2 | LoadRequestAction3
