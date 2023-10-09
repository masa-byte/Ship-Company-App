import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RentingState } from "../states/renting.state";
import { rentingAdapter } from "../reducers/renting.reducer";

export const selectRentingState = createFeatureSelector<RentingState>('rentings');

export const {
    selectAll: selectAllRenting,
    selectEntities: selectRentingEntities,
    selectIds: selectRentingIds,
} = rentingAdapter.getSelectors(selectRentingState);

export const selectSelectedRentingId = createSelector(
    selectRentingState,
    (state) => state.selectedRentingId
);

export const selectRentingLoading = createSelector(
    selectRentingState,
    (state) => state.loading
);

export const selectRentingError = createSelector(
    selectRentingState,
    (state) => state.error
);

export const selectSelectedRenting = createSelector(
    selectRentingEntities,
    selectSelectedRentingId,
    (rentingEntities, selectedRentingId) => rentingEntities[selectedRentingId!]
);