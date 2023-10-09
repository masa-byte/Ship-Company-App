import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { JetSki } from "src/app/jet-ski/jet-ski.model";
import { JetSkiState } from "../states/jet-ski.state";
import { createReducer, on } from "@ngrx/store";
import * as JetSkiActions from '../actions/jet-ski.actions';

export const jetSkiAdapter: EntityAdapter<JetSki> = createEntityAdapter<JetSki>();

export const initialState: JetSkiState = jetSkiAdapter.getInitialState({
    selectedJetSkiId: null,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    searchText: ''
});

export const jetSkiReducer = createReducer(
    initialState,
    on(JetSkiActions.addJetSkiSuccess, (state, { jetSki }) => {
        return jetSkiAdapter.addOne(jetSki, state);
    }),
    on(JetSkiActions.addJetSkiFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(JetSkiActions.updateJetSkiSuccess, (state, { jetSki }) => {
        return jetSkiAdapter.updateOne({ id: jetSki.id, changes: jetSki }, state);
    }),
    on(JetSkiActions.updateJetSkiFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(JetSkiActions.deleteJetSkiSuccess, (state, { id }) => {
        return jetSkiAdapter.removeOne(id, state);
    }),
    on(JetSkiActions.deleteJetSkiFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(JetSkiActions.loadJetSkies, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(JetSkiActions.loadJetSkiesSuccess, (state, { jetSki }) => {
        return jetSkiAdapter.setAll(jetSki, {
            ...state,
            loading: false
        });
    }),
    on(JetSkiActions.loadJetSkiesFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(JetSkiActions.selectJetSki, (state, { id }) => {
        return {
            ...state,
            selectedJetSkiId: id
        };
    }),
    on(JetSkiActions.clearJetSkiError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(JetSkiActions.sortJetSkies, (state, { sortingCriteria, sortAscending, searchText }) => {
        return {
            ...state,
            sortingCriteria: sortingCriteria,
            sortAscending: sortAscending,
            searchText: searchText
        };
    }),
    on(JetSkiActions.rateJetSkiSuccess, (state, { jetSki }) => {
        return jetSkiAdapter.updateOne({ id: jetSki.id, changes: { rating: jetSki.rating } }, state);
    }),
    on(JetSkiActions.rateJetSkiFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    })
);