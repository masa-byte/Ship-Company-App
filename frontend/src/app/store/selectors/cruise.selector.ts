import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { CruiseState } from "../states/cruise.state";
import { cruiseAdapter } from "../reducers/cruise.reducer";

export const selectCruiseState = createFeatureSelector<CruiseState>('cruises');

export const {
    selectAll: selectAllCruise,
    selectEntities: selectCruiseEntities,
    selectIds: selectCruiseIds,
} = cruiseAdapter.getSelectors(selectCruiseState);

export const selectSelectedCruiseId = createSelector(
    selectCruiseState,
    (state) => state.selectedCruiseId
);

export const selectCruiseLoading = createSelector(
    selectCruiseState,
    (state) => state.loading
);

export const selectCruiseError = createSelector(
    selectCruiseState,
    (state) => state.error
);

export const selectSelectedCruise = createSelector(
    selectCruiseEntities,
    selectSelectedCruiseId,
    (cruiseEntities, selectedCruiseId) => cruiseEntities[selectedCruiseId!]
);

export const selectSortingCriteria = createSelector(
    selectCruiseState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectCruiseState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectCruiseState,
    (state) => state.searchText
);

export const selectTypeFilter = createSelector(
    selectCruiseState,
    (state) => state.typeFiler
);

export const selectFilteredCruises = createSelector(
    selectCruiseEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectTypeFilter,
    selectSearchText,
    (entities, sorting, ascending, types, searchText) => {
        let arrayOfCruises = Object.values(entities!);

        if (searchText !== '') {
            let arr1 = arrayOfCruises.filter((cruise: any) => cruise.cruiseShip.name.toLowerCase().includes(searchText.toLowerCase()));
            let arr2 = arrayOfCruises.filter((cruise: any) => {
                let cities = cruise.destinations.map((destination: any) => destination.city);
                return cities.some((city: any) => city.toLowerCase().includes(searchText.toLowerCase()));
            });
            arrayOfCruises = [...arr1, ...arr2];
        }

        if (types.length > 0)
            arrayOfCruises = arrayOfCruises.filter((cruise: any) => types.includes(cruise.type));

        if (sorting === 'noCriteria')
            return arrayOfCruises;

        return arrayOfCruises.sort((a: any, b: any) => {
            let d1 = Date.parse(a[sorting].toString());
            let d2 = Date.parse(b[sorting].toString());
            if (ascending)
                return d1 - d2;
            else
                return d2 - d1;
        });
    }
);