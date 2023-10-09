import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SuiteState } from "../states/suite.state";
import { suiteAdapter } from "../reducers/suite.reducer";

export const selectSuiteState = createFeatureSelector<SuiteState>('suites');

export const {
    selectAll: selectAllSuite,
    selectEntities: selectSuiteEntities,
    selectIds: selectSuiteIds,
} = suiteAdapter.getSelectors(selectSuiteState);

export const selectSelectedSuiteId = createSelector(
    selectSuiteState,
    (state) => state.selectedSuiteId
);

export const selectSuiteLoading = createSelector(
    selectSuiteState,
    (state) => state.loading
);

export const selectSuiteError = createSelector(
    selectSuiteState,
    (state) => state.error
);

export const selectSelectedSuite = createSelector(
    selectSuiteEntities,
    selectSelectedSuiteId,
    (suiteEntities, selectedSuiteId) => suiteEntities[selectedSuiteId!]
);