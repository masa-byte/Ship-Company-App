import { createAction, props } from "@ngrx/store";
import { Cruise } from "src/app/cruise/cruise.model";

export const getCruise = createAction('[Cruise] Get Cruise', props<{ id: number }>());

export const addCruise = createAction('[Cruise] Add Cruise', props<{ cruise: Cruise }>());

export const addCruiseSuccess = createAction('[Cruise] Add Cruise Success', props<{ cruise: Cruise }>());

export const addCruiseFailure = createAction('[Cruise] Add Cruise Failure', props<{ error: string }>());

export const deleteCruise = createAction('[Cruise] Delete Cruise', props<{ id: number }>());

export const deleteCruiseSuccess = createAction('[Cruise] Delete Cruise Success', props<{ id: number }>());

export const deleteCruiseFailure = createAction('[Cruise] Delete Cruise Failure', props<{ error: string }>());

export const loadCruises = createAction('[Cruise] Load Cruises');

export const loadCruisesSuccess = createAction('[Cruise] Load Cruises Success', props<{ cruise: Cruise[] }>());

export const loadCruisesFailure = createAction('[Cruise] Load Cruises Failure', props<{ error: string }>());

export const selectCruise = createAction('[Cruise] Select Cruise', props<{ id: number }>());

export const clearCruiseError = createAction('[Cruise] Clear Error');

export const sortCruises = createAction(
    '[Cruise] Sort Cruises',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string, typeFiler: string[] }>()
);