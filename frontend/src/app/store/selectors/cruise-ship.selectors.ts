import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CruiseShipState } from "../states/cruise-ship.state";
import { cruiseShipAdapter } from "../reducers/cruise-ship.reducer";

export const selectCruiseShipState = createFeatureSelector<CruiseShipState>('cruiseShips');

export const {
    selectAll: selectAllCruiseShip,
    selectEntities: selectCruiseShipEntities,
    selectIds: selectCruiseShipIds,
} = cruiseShipAdapter.getSelectors(selectCruiseShipState);

export const selectSelectedCruiseShipId = createSelector(
    selectCruiseShipState,
    (state) => state.selectedCruiseShipId
);

export const selectCruiseShipLoading = createSelector(
    selectCruiseShipState,
    (state) => state.loading
);

export const selectCruiseShipError = createSelector(
    selectCruiseShipState,
    (state) => state.error
);

export const selectSelectedCruiseShip = createSelector(
    selectCruiseShipEntities,
    selectSelectedCruiseShipId,
    (cruiseShipEntities, selectedCruiseShipId) => cruiseShipEntities[selectedCruiseShipId!]
);

export const selectLastCruiseShip = createSelector(
    selectAllCruiseShip,
    (cruiseShips) => cruiseShips[cruiseShips.length - 1]
);

export const selectSortingCriteria = createSelector(
    selectCruiseShipState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectCruiseShipState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectCruiseShipState,
    (state) => state.searchText
);

export const selectFilteredCruiseShips = createSelector(
    selectCruiseShipEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectSearchText,
    (entities, sorting, ascending, searchText) => {
        let arrayOfCruiseShips = Object.values(entities!);

        if (searchText !== '')
            arrayOfCruiseShips = arrayOfCruiseShips.filter((cruiseShip: any) => cruiseShip.name.toLowerCase().includes(searchText.toLowerCase()));

        if (sorting === 'none')
            return [];

        if (sorting === 'noCriteria')
            return arrayOfCruiseShips;

        return arrayOfCruiseShips.sort((a: any, b: any) => {
            if (ascending)
                return a[sorting] - b[sorting];
            else {
                return b[sorting] - a[sorting];
            }
        });
    }
);