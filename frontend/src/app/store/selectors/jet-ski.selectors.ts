import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JetSkiState } from "../states/jet-ski.state";
import { jetSkiAdapter } from "../reducers/jet-ski.reducer";

export const selectJetSkiState = createFeatureSelector<JetSkiState>('jetSkies');

export const {
    selectAll: selectAllJetSki,
    selectEntities: selectJetSkiEntities,
    selectIds: selectJetSkiIds,
} = jetSkiAdapter.getSelectors(selectJetSkiState);

export const selectSelectedJetSkiId = createSelector(
    selectJetSkiState,
    (state) => state.selectedJetSkiId
);

export const selectJetSkiLoading = createSelector(
    selectJetSkiState,
    (state) => state.loading
);

export const selectJetSkiError = createSelector(
    selectJetSkiState,
    (state) => state.error
);

export const selectSelectedJetSki = createSelector(
    selectJetSkiEntities,
    selectSelectedJetSkiId,
    (jetSkiEntities, selectedJetSkiId) => jetSkiEntities[selectedJetSkiId!]
);

export const selectSortingCriteria = createSelector(
    selectJetSkiState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectJetSkiState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectJetSkiState,
    (state) => state.searchText
);

export const selectFilteredJetSkies = createSelector(
    selectJetSkiEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectSearchText,
    (entities, sorting, ascending, searchText) => {
        let arrayOfJetSkies = Object.values(entities!);

        if (searchText !== '')
            arrayOfJetSkies = arrayOfJetSkies.filter((jetSki: any) => jetSki.model.toLowerCase().includes(searchText.toLowerCase()));

        if (sorting === 'none')
            return [];

        if (sorting === 'noCriteria')
            return arrayOfJetSkies;

        return arrayOfJetSkies.sort((a: any, b: any) => {
            if (ascending)
                return a[sorting] - b[sorting];
            else {
                return b[sorting] - a[sorting];
            }
        });
    }
);