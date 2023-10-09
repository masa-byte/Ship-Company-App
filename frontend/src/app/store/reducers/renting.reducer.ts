import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Renting } from "src/app/renting/renting.model";
import { RentingState } from "../states/renting.state";
import { createReducer, on } from "@ngrx/store";
import * as RentingActions from '../actions/renting.actions';

export const rentingAdapter: EntityAdapter<Renting> = createEntityAdapter<Renting>();

export const initialState: RentingState = rentingAdapter.getInitialState({
    selectedRentingId: null,
    loading: false,
    error: '',
});

export const rentingReducer = createReducer(
    initialState,
    on(RentingActions.addRentingSuccess, (state, { renting }) => {
        return rentingAdapter.addOne(renting, state);
    }),
    on(RentingActions.addRentingFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(RentingActions.deleteRentingSuccess, (state, { id }) => {
        return rentingAdapter.removeOne(id, state);
    }),
    on(RentingActions.deleteRentingFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(RentingActions.loadRentings, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(RentingActions.loadRentingsSuccess, (state, { renting }) => {
        return rentingAdapter.setAll(renting, {
            ...state,
            loading: false
        });
    }),
    on(RentingActions.loadRentingsFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(RentingActions.selectRenting, (state, { id }) => {
        return {
            ...state,
            selectedRentingId: id
        };
    }),
    on(RentingActions.clearRentingError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(RentingActions.rateRentingSuccess, (state, { id }) => {
        return rentingAdapter.updateOne({ id: id, changes: { isRated: true } }, state);
    }),
    on(RentingActions.rateRentingFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    })
);