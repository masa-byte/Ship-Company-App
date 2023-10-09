import { createAction, props } from "@ngrx/store";
import { Renting } from "src/app/renting/renting.model";

export const getRenting = createAction('[Renting] Get Renting', props<{ id: number }>());

export const addRenting = createAction('[Renting] Add Renting', props<{ renting: Renting }>());

export const addRentingSuccess = createAction('[Renting] Add Renting Success', props<{ renting: Renting }>());

export const addRentingFailure = createAction('[Renting] Add Renting Failure', props<{ error: string }>());

export const deleteRenting = createAction('[Renting] Delete Renting', props<{ id: number }>());

export const deleteRentingSuccess = createAction('[Renting] Delete Renting Success', props<{ id: number }>());

export const deleteRentingFailure = createAction('[Renting] Delete Renting Failure', props<{ error: string }>());

export const loadRentings = createAction('[Renting] Load Rentings', props<{ id: number }>());

export const loadRentingsSuccess = createAction('[Renting] Load Rentings Success', props<{ renting: Renting[] }>());

export const loadRentingsFailure = createAction('[Renting] Load Rentings Failure', props<{ error: string }>());

export const selectRenting = createAction('[Renting] Select Renting', props<{ id: number }>());

export const clearRentingError = createAction('[Renting] Clear Error');

export const rateRenting = createAction('[Renting] Rate Renting', props<{ id: number }>());

export const rateRentingSuccess = createAction('[Renting] Rate Renting Success', props<{ id: number }>());

export const rateRentingFailure = createAction('[Renting] Rate Renting Failure', props<{ error: string }>());