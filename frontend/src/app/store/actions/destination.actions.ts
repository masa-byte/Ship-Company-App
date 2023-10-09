import { createAction, props } from "@ngrx/store";
import { Destination } from "src/app/destination/destination.model";

export const getDestination = createAction('[Destination] Get Destination', props<{ id: number }>());

export const loadDestinations = createAction('[Destination] Load Destinations');

export const loadDestinationsSuccess = createAction('[Destination] Load Destinations Success', props<{ destinations: Destination[] }>());

export const loadDestinationsFailure = createAction('[Destination] Load Destinations Failure', props<{ error: string }>());

export const selectDestination = createAction('[Destination] Select Destination', props<{ id: number }>());