import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { BoatState } from "../states/boat.state";
import { boatAdapter } from "../reducers/boat.reducer";

export const selectBoatState = createFeatureSelector<BoatState>('boats');

export const {
    selectAll: selectAllBoat,
    selectEntities: selectBoatEntities,
    selectIds: selectBoatIds,
} = boatAdapter.getSelectors(selectBoatState);

export const selectSelectedBoatId = createSelector(
    selectBoatState,
    (state) => state.selectedBoatId
);

export const selectBoatLoading = createSelector(
    selectBoatState,
    (state) => state.loading
);

export const selectBoatError = createSelector(
    selectBoatState,
    (state) => state.error
);

export const selectSelectedBoat = createSelector(
    selectBoatEntities,
    selectSelectedBoatId,
    (boatEntities, selectedBoatId) => boatEntities[selectedBoatId!]
);

export const selectSortingCriteria = createSelector(
    selectBoatState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectBoatState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectBoatState,
    (state) => state.searchText
);

export const selectFilteredBoats = createSelector(
    selectBoatEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectSearchText,
    (entities, sorting, ascending, searchText) => {
        let arrayOfBoats = Object.values(entities!);

        if (searchText !== '')
            arrayOfBoats = arrayOfBoats.filter((boat: any) => boat.type.toLowerCase().includes(searchText.toLowerCase()));

        if (sorting === 'none')
            return [];

        if (sorting === 'noCriteria')
            return arrayOfBoats;
        
        return arrayOfBoats.sort((a: any, b: any) => {
            if (ascending)
                return a[sorting] - b[sorting];
            else
                return b[sorting] - a[sorting];
        });
    }
);