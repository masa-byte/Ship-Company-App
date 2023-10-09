import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DestinationState } from "../states/destination.state";
import { destinationAdapter } from "../reducers/destination.reducer";

export const selectDestinationState = createFeatureSelector<DestinationState>('destinations');

export const {
    selectAll: selectAllDestination,
    selectEntities: selectDestinationEntities,
    selectIds: selectDestinationIds,
} = destinationAdapter.getSelectors(selectDestinationState);

export const selectSelectedDestinationId = createSelector(
    selectDestinationState,
    (state) => state.selectedDestinationId
);

export const selectDestinationLoading = createSelector(
    selectDestinationState,
    (state) => state.loading
);

export const selectDestinationError = createSelector(
    selectDestinationState,
    (state) => state.error
);

export const selectSelectedDestination = createSelector(
    selectDestinationEntities,
    selectSelectedDestinationId,
    (destinationEntities, selectedDestinationId) => destinationEntities[selectedDestinationId!]
);