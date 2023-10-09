import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Destination } from "src/app/destination/destination.model";
import { DestinationState } from "../states/destination.state";
import { createReducer, on } from "@ngrx/store";
import * as DestinationActions from '../actions/destination.actions';

export const destinationAdapter: EntityAdapter<Destination> = createEntityAdapter<Destination>();

export const initialState: DestinationState = destinationAdapter.getInitialState({
    selectedDestinationId: null,
    loading: false,
    error: ''
});

export const destinationReducer = createReducer(
    initialState,
    on(DestinationActions.loadDestinations, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(DestinationActions.loadDestinationsSuccess, (state, { destinations }) => {
        return destinationAdapter.setAll(destinations, {
            ...state,
            loading: false
        });
    }),
    on(DestinationActions.loadDestinationsFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(DestinationActions.selectDestination, (state, { id }) => {
        return {
            ...state,
            selectedDestinationId: id
        };
    })
);