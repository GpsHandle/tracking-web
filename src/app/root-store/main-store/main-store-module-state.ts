import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export const featureAdapter: EntityAdapter<any> = createEntityAdapter({
    selectId: model => model.id,
    sortComparer: (a, b): number => {
        return 1
    }
});

export interface State extends EntityState<any> {
    isLoading?: boolean;
    error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
    isLoading: false,
    error: null
});
