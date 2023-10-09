import { createAction, props } from "@ngrx/store";
import { Boat } from "src/app/boat/boat.model";

export const getBoat = createAction('[Boat] Get Boat', props<{ id: number }>());

export const addBoat = createAction('[Boat] Add Boat', props<{ boat: Boat }>());

export const addBoatSuccess = createAction('[Boat] Add Boat Success', props<{ boat: Boat }>());

export const addBoatFailure = createAction('[Boat] Add Boat Failure', props<{ error: string }>());

export const updateBoat = createAction('[Boat] Update Boat', props<{ boat: Boat }>());

export const updateBoatSuccess = createAction('[Boat] Update Boat Success', props<{ boat: Boat }>());

export const updateBoatFailure = createAction('[Boat] Update Boat Failure', props<{ error: string }>());

export const deleteBoat = createAction('[Boat] Delete Boat', props<{ id: number }>());

export const deleteBoatSuccess = createAction('[Boat] Delete Boat Success', props<{ id: number }>());

export const deleteBoatFailure = createAction('[Boat] Delete Boat Failure', props<{ error: string }>());

export const loadBoats = createAction('[Boat] Load Boats');

export const loadBoatsSuccess = createAction('[Boat] Load Boats Success', props<{ boat: Boat[] }>());

export const loadBoatsFailure = createAction('[Boat] Load Boats Failure', props<{ error: string }>());

export const selectBoat = createAction('[Boat] Select Boat', props<{ id: number }>());

export const clearBoatError = createAction('[Boat] Clear Error');

export const sortBoats = createAction(
    '[Boat] Sort Boats',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string }>()
);

export const rateBoat = createAction('[Boat] Rate Boat', props<{ id: number, rating: number }>());

export const rateBoatSuccess = createAction('[Boat] Rate Boat Success', props<{ boat: Boat }>());

export const rateBoatFailure = createAction('[Boat] Rate Boat Failure', props<{ error: string }>());