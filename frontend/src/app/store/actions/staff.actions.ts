import { createAction, props } from "@ngrx/store";
import { Staff } from "src/app/staff/staff.model";

export const getStaff = createAction('[Staff] Get Staff', props<{ id: number }>());

export const addStaff = createAction('[Staff] Add Staff', props<{ staff: Staff }>());

export const addStaffSuccess = createAction('[Staff] Add Staff Success', props<{ staff: Staff }>());

export const addStaffFailure = createAction('[Staff] Add Staff Failure', props<{ error: string }>());

export const updateStaff = createAction('[Staff] Update Staff', props<{ staff: Staff }>());

export const updateStaffSuccess = createAction('[Staff] Update Staff Success', props<{ staff: Staff }>());

export const updateStaffFailure = createAction('[Staff] Update Staff Failure', props<{ error: string }>());

export const deleteStaff = createAction('[Staff] Delete Staff', props<{ id: number }>());

export const deleteStaffSuccess = createAction('[Staff] Delete Staff Success', props<{ id: number }>());

export const deleteStaffFailure = createAction('[Staff] Delete Staff Failure', props<{ error: string }>());

export const loadStaff = createAction('[Staff] Load Staff');

export const loadStaffSuccess = createAction('[Staff] Load Staff Success', props<{ staff: Staff[] }>());

export const loadStaffFailure = createAction('[Staff] Load Staff Failure', props<{ error: string }>());

export const selectStaff = createAction('[Staff] Select Staff', props<{ id: number }>());

export const clearStaffError = createAction('[Staff] Clear Error');

export const sortStaff = createAction(
    '[Staff] Sort Staff',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string, jobFilter: string[] }>()
);