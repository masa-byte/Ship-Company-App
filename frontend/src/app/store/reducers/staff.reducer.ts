import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Staff } from "src/app/staff/staff.model";
import { StaffState } from "../states/staff.state";
import { createReducer, on } from "@ngrx/store";
import * as StaffActions from '../actions/staff.actions';

export const staffAdapter: EntityAdapter<Staff> = createEntityAdapter<Staff>();

export const initialState: StaffState = staffAdapter.getInitialState({
    selectedStaffId: null,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    jobFilter: [],
    searchText: ''
});

export const staffReducer = createReducer(
    initialState,
    on(StaffActions.addStaffSuccess, (state, { staff }) => {
        return staffAdapter.addOne(staff, state);
    }),
    on(StaffActions.addStaffFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(StaffActions.updateStaffSuccess, (state, { staff }) => {
        return staffAdapter.updateOne({ id: staff.id, changes: staff }, state);
    }),
    on(StaffActions.updateStaffFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(StaffActions.deleteStaffSuccess, (state, { id }) => {
        return staffAdapter.removeOne(id, state);
    }),
    on(StaffActions.deleteStaffFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(StaffActions.loadStaff, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(StaffActions.loadStaffSuccess, (state, { staff }) => {
        return staffAdapter.setAll(staff, {
            ...state,
            loading: false
        });
    }),
    on(StaffActions.loadStaffFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(StaffActions.selectStaff, (state, { id }) => {
        return {
            ...state,
            selectedStaffId: id
        };
    }),
    on(StaffActions.clearStaffError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(StaffActions.sortStaff, (state, { sortingCriteria, sortAscending, searchText, jobFilter }) => {
        return {
            ...state,
            sortingCriteria: sortingCriteria,
            sortAscending: sortAscending,
            jobFilter: jobFilter,
            searchText: searchText
        };
    })
);