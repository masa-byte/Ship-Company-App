import { createAction, props } from "@ngrx/store";
import { Reservation } from "src/app/reservation/reservation.model";

export const getReservation = createAction('[Reservation] Get Reservation', props<{ id: number }>());

export const addReservation = createAction('[Reservation] Add Reservation', props<{ reservation: Reservation }>());

export const addReservationSuccess = createAction('[Reservation] Add Reservation Success', props<{ reservation: Reservation }>());

export const addReservationFailure = createAction('[Reservation] Add Reservation Failure', props<{ error: string }>());

export const deleteReservation = createAction('[Reservation] Delete Reservation', props<{ id: number }>());

export const deleteReservationSuccess = createAction('[Reservation] Delete Reservation Success', props<{ id: number }>());

export const deleteReservationFailure = createAction('[Reservation] Delete Reservation Failure', props<{ error: string }>());

export const loadReservations = createAction('[Reservation] Load Reservations', props<{ id: number }>());

export const loadReservationsSuccess = createAction('[Reservation] Load Reservations Success', props<{ reservation: Reservation[] }>());

export const loadReservationsFailure = createAction('[Reservation] Load Reservations Failure', props<{ error: string }>());

export const selectReservation = createAction('[Reservation] Select Reservation', props<{ id: number }>());

export const clearReservationError = createAction('[Reservation] Clear Error');

export const rateReservation = createAction('[Reservation] Rate Reservation', props<{ id: number }>());

export const rateReservationSuccess = createAction('[Reservation] Rate Reservation Success', props<{ id: number }>());

export const rateReservationFailure = createAction('[Reservation] Rate Reservation Failure', props<{ error: string }>());