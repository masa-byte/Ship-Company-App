import { createAction, props } from "@ngrx/store";
import { Suite } from "src/app/suite/suite.model";

export const getSuite = createAction('[Suite] Get Suite', props<{ id: number }>());

export const addSuites = createAction('[Suite] Add Suites', props<{ suites: Suite[] }>());

export const addSuitesSuccess = createAction('[Suite] Add Suites Success', props<{ suites: Suite[] }>());

export const addSuitesFailure = createAction('[Suite] Add Suites Failure', props<{ error: string }>());

export const updateSuites = createAction('[Suite] Update Suites', props<{ suites: Suite[] }>());

export const updateSuitesSuccess = createAction('[Suite] Update Suites Success', props<{ suites: Suite[] }>());

export const updateSuitesFailure = createAction('[Suite] Update Suites Failure', props<{ error: string }>());

export const deleteSuites = createAction('[Suite] Delete Suites', props<{ ids: number[] }>());

export const deleteSuitesSuccess = createAction('[Suite] Delete Suites Success', props<{ ids: number[] }>());

export const deleteSuitesFailure = createAction('[Suite] Delete Suites Failure', props<{ error: string }>());

export const loadSuites = createAction('[Suite] Load Suites', props<{ id: number }>());

export const loadSuitesSuccess = createAction('[Suite] Load Suites Success', props<{ suites: Suite[] }>());

export const loadSuitesFailure = createAction('[Suite] Load Suites Failure', props<{ error: string }>());

export const selectSuite = createAction('[Suite] Select Suite', props<{ id: number }>());

export const clearSuiteError = createAction('[Suite] Clear Error');

export const clearSuiteEntities = createAction('[Suite] Clear Entities');