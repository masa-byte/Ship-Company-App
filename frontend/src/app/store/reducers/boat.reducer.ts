import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Boat } from "src/app/boat/boat.model";
import { BoatState } from "../states/boat.state";
import { createReducer, on } from "@ngrx/store";
import * as BoatActions from '../actions/boat.actions';

export const boatAdapter: EntityAdapter<Boat> = createEntityAdapter<Boat>();

export const initialState: BoatState = boatAdapter.getInitialState({
    selectedBoatId: null,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    searchText: ''
});

export const boatReducer = createReducer(
    initialState,
    on(BoatActions.addBoatSuccess, (state, { boat }) => {
        return boatAdapter.addOne(boat, state);
    }),
    on(BoatActions.addBoatFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(BoatActions.updateBoatSuccess, (state, { boat }) => {
        return boatAdapter.updateOne({ id: boat.id, changes: boat }, state);
    }),
    on(BoatActions.updateBoatFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(BoatActions.deleteBoatSuccess, (state, { id }) => {
        return boatAdapter.removeOne(id, state);
    }),
    on(BoatActions.deleteBoatFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(BoatActions.loadBoats, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(BoatActions.loadBoatsSuccess, (state, { boat }) => {
        return boatAdapter.setAll(boat, {
            ...state,
            loading: false
        });
    }),
    on(BoatActions.loadBoatsFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(BoatActions.selectBoat, (state, { id }) => {
        return {
            ...state,
            selectedBoatId: id
        };
    }),
    on(BoatActions.clearBoatError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(BoatActions.sortBoats, (state, { sortingCriteria, sortAscending, searchText }) => {
        return {
            ...state,
            sortingCriteria: sortingCriteria,
            sortAscending: sortAscending,
            searchText: searchText
        };
    }),
    on(BoatActions.rateBoatSuccess, (state, { boat }) => {
        return boatAdapter.updateOne({ id: boat.id, changes: { rating: boat.rating } }, state);
    }),
    on(BoatActions.rateBoatFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    })
);