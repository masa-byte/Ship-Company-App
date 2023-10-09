import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Cruise } from "src/app/cruise/cruise.model";
import { CruiseState } from "../states/cruise.state";
import { createReducer, on } from "@ngrx/store";
import * as CruiseActions from '../actions/cruise.actions';

export const cruiseAdapter: EntityAdapter<Cruise> = createEntityAdapter<Cruise>();

export const initialState: CruiseState = cruiseAdapter.getInitialState({
    selectedCruiseId: null,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    typeFiler: [],
    searchText: ''
});

export const cruiseReducer = createReducer(
    initialState,
    on(CruiseActions.addCruiseSuccess, (state, { cruise }) => {
        return cruiseAdapter.addOne(cruise, state);
    }),
    on(CruiseActions.addCruiseFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(CruiseActions.deleteCruiseSuccess, (state, { id }) => {
        return cruiseAdapter.removeOne(id, state);
    }),
    on(CruiseActions.deleteCruiseFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(CruiseActions.loadCruises, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(CruiseActions.loadCruisesSuccess, (state, { cruise }) => {
        return cruiseAdapter.setAll(cruise, {
            ...state,
            loading: false
        });
    }),
    on(CruiseActions.loadCruisesFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(CruiseActions.selectCruise, (state, { id }) => {
        return {
            ...state,
            selectedCruiseId: id
        };
    }),
    on(CruiseActions.clearCruiseError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(CruiseActions.sortCruises, (state, { sortingCriteria, sortAscending, searchText, typeFiler }) => {
        return {
            ...state,
            sortingCriteria: sortingCriteria,
            sortAscending: sortAscending,
            typeFiler: typeFiler,
            searchText: searchText
        };
    }),
);