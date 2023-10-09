import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Reservation } from "src/app/reservation/reservation.model";
import { ReservationState } from "../states/reservation.state";
import { createReducer, on } from "@ngrx/store";
import * as ReservationActions from '../actions/reservation.actions';

export const reservationAdapter: EntityAdapter<Reservation> = createEntityAdapter<Reservation>();

export const initialState: ReservationState = reservationAdapter.getInitialState({
    selectedReservationId: null,
    loading: false,
    error: '',
});

export const reservationReducer = createReducer(
    initialState,
    on(ReservationActions.addReservationSuccess, (state, { reservation }) => {
        return reservationAdapter.addOne(reservation, state);
    }),
    on(ReservationActions.addReservationFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(ReservationActions.deleteReservationSuccess, (state, { id }) => {
        return reservationAdapter.removeOne(id, state);
    }),
    on(ReservationActions.deleteReservationFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(ReservationActions.loadReservations, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(ReservationActions.loadReservationsSuccess, (state, { reservation }) => {
        return reservationAdapter.setAll(reservation, {
            ...state,
            loading: false
        });
    }),
    on(ReservationActions.loadReservationsFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(ReservationActions.selectReservation, (state, { id }) => {
        return {
            ...state,
            selectedReservationId: id
        };
    }),
    on(ReservationActions.clearReservationError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(ReservationActions.rateReservationSuccess, (state, { id }) => {
        return reservationAdapter.updateOne({ id: id, changes: { isRated: true } }, state);
    }),
    on(ReservationActions.rateReservationFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    })
);