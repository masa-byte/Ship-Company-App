import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CruiseShip } from "src/app/cruise-ship/cruise-ship.model";
import { CruiseShipState } from "../states/cruise-ship.state";
import { createReducer, on } from "@ngrx/store";
import * as CruiseShipActions from '../actions/cruise-ship.actions';

export const cruiseShipAdapter: EntityAdapter<CruiseShip> = createEntityAdapter<CruiseShip>();

export const initialState: CruiseShipState = cruiseShipAdapter.getInitialState({
    selectedCruiseShipId: null,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    searchText: ''
});

export const cruiseShipReducer = createReducer(
    initialState,
    on(CruiseShipActions.addCruiseShipSuccess, (state, { cruiseShip }) => {
        return cruiseShipAdapter.addOne(cruiseShip, state);
    }),
    on(CruiseShipActions.addCruiseShipFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(CruiseShipActions.updateCruiseShipSuccess, (state, { cruiseShip }) => {
        return cruiseShipAdapter.updateOne({ id: cruiseShip.id, changes: cruiseShip }, state);
    }),
    on(CruiseShipActions.updateCruiseShipFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(CruiseShipActions.deleteCruiseShipSuccess, (state, { id }) => {
        return cruiseShipAdapter.removeOne(id, state);
    }),
    on(CruiseShipActions.deleteCruiseShipFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(CruiseShipActions.loadCruiseShips, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(CruiseShipActions.loadCruiseShipsSuccess, (state, { cruiseShip }) => {
        return cruiseShipAdapter.setAll(cruiseShip, {
            ...state,
            loading: false
        });
    }),
    on(CruiseShipActions.loadCruiseShipsFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(CruiseShipActions.selectCruiseShip, (state, { id }) => {
        return {
            ...state,
            selectedCruiseShipId: id
        };
    }),
    on(CruiseShipActions.clearCruiseShipError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(CruiseShipActions.sortCruiseShips, (state, { sortingCriteria, sortAscending, searchText }) => {
        return {
            ...state,
            sortAscending: sortAscending,
            sortingCriteria: sortingCriteria,
            searchText: searchText
        };
    }),
    on(CruiseShipActions.clearEntities, (state) => {
        return cruiseShipAdapter.removeAll(state);
    }),
    on(CruiseShipActions.rateCruiseShipSuccess, (state, { cruiseShip }) => {
        return cruiseShipAdapter.updateOne({ id: cruiseShip.id, changes: cruiseShip }, state);
    }),
    on(CruiseShipActions.rateCruiseShipFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    })
);