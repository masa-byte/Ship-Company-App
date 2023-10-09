import { createAction, props } from "@ngrx/store";
import { CruiseShip } from "src/app/cruise-ship/cruise-ship.model";

export const getCruiseShip = createAction('[CruiseShip] Get CruiseShip', props<{ id: number }>());

export const addCruiseShip = createAction('[CruiseShip] Add CruiseShip', props<{ cruiseShip: CruiseShip }>());

export const addCruiseShipSuccess = createAction('[CruiseShip] Add CruiseShip Success', props<{ cruiseShip: CruiseShip }>());

export const addCruiseShipFailure = createAction('[CruiseShip] Add CruiseShip Failure', props<{ error: string }>());

export const updateCruiseShip = createAction('[CruiseShip] Update CruiseShip', props<{ cruiseShip: CruiseShip }>());

export const updateCruiseShipSuccess = createAction('[CruiseShip] Update CruiseShip Success', props<{ cruiseShip: CruiseShip }>());

export const updateCruiseShipFailure = createAction('[CruiseShip] Update CruiseShip Failure', props<{ error: string }>());

export const deleteCruiseShip = createAction('[CruiseShip] Delete CruiseShip', props<{ id: number }>());

export const deleteCruiseShipSuccess = createAction('[CruiseShip] Delete CruiseShip Success', props<{ id: number }>());

export const deleteCruiseShipFailure = createAction('[CruiseShip] Delete CruiseShip Failure', props<{ error: string }>());

export const loadCruiseShips = createAction('[CruiseShip] Load CruiseShips');

export const loadCruiseShipsSuccess = createAction('[CruiseShip] Load CruiseShips Success', props<{ cruiseShip: CruiseShip[] }>());

export const loadCruiseShipsFailure = createAction('[CruiseShip] Load CruiseShips Failure', props<{ error: string }>());

export const selectCruiseShip = createAction('[CruiseShip] Select CruiseShip', props<{ id: number }>());

export const clearCruiseShipError = createAction('[CruiseShip] Clear Error');

export const sortCruiseShips = createAction(
    '[CruiseShip] Sort CruiseShips',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string }>()
);

export const clearEntities = createAction('[CruiseShip] Clear Entities');

export const rateCruiseShip = createAction('[CruiseShip] Rate CruiseShip', props<{ id: number, rating: number }>());

export const rateCruiseShipSuccess = createAction('[CruiseShip] Rate CruiseShip Success', props<{ cruiseShip: CruiseShip }>());

export const rateCruiseShipFailure = createAction('[CruiseShip] Rate CruiseShip Failure', props<{ error: string }>());