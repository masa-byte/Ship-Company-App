import { EntityAdapter, Update, createEntityAdapter } from "@ngrx/entity";
import { Suite } from "src/app/suite/suite.model";
import { SuiteState } from "../states/suite.state";
import { createReducer, on } from "@ngrx/store";
import * as SuiteActions from '../actions/suite.actions';

export const suiteAdapter: EntityAdapter<Suite> = createEntityAdapter<Suite>();

export const initialState: SuiteState = suiteAdapter.getInitialState({
    selectedSuiteId: null,
    loading: false,
    error: '',
});

export const suiteReducer = createReducer(
    initialState,
    on(SuiteActions.addSuitesSuccess, (state, { suites }) => {
        return suiteAdapter.addMany(suites, state);
    }),
    on(SuiteActions.addSuitesFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(SuiteActions.deleteSuitesSuccess, (state, { ids }) => {
        return suiteAdapter.removeMany(ids, state);
    }),
    on(SuiteActions.deleteSuitesFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(SuiteActions.loadSuites, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(SuiteActions.loadSuitesSuccess, (state, { suites }) => {
        return suiteAdapter.setAll(suites, {
            ...state,
            loading: false
        });
    }),
    on(SuiteActions.loadSuitesFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(SuiteActions.updateSuitesSuccess, (state, { suites }) => {
        const suiteUpdates: Update<Suite>[] = suites.map(suite => ({
            id: suite.id,
            changes: suite
        }));
        return suiteAdapter.updateMany(suiteUpdates, state);
    }),
    on(SuiteActions.updateSuitesFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(SuiteActions.selectSuite, (state, { id }) => {
        return {
            ...state,
            selectedSuiteId: id
        };
    }),
    on(SuiteActions.clearSuiteError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(SuiteActions.clearSuiteEntities, (state) => {
        return suiteAdapter.removeAll(state);
    })
);