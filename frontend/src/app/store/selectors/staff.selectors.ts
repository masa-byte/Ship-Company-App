import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StaffState } from "../states/staff.state";
import { staffAdapter } from "../reducers/staff.reducer";

export const selectStaffState = createFeatureSelector<StaffState>('staff');

export const {
    selectAll: selectAllStaff,
    selectEntities: selectStaffEntities,
    selectIds: selectStaffIds,
} = staffAdapter.getSelectors(selectStaffState);

export const selectSelectedStaffId = createSelector(
    selectStaffState,
    (state) => state.selectedStaffId
);

export const selectStaffLoading = createSelector(
    selectStaffState,
    (state) => state.loading
);

export const selectStaffError = createSelector(
    selectStaffState,
    (state) => state.error
);

export const selectSelectedStaff = createSelector(
    selectStaffEntities,
    selectSelectedStaffId,
    (staffEntities, selectedStaffId) => staffEntities[selectedStaffId!]
);

export const selectSortingCriteria = createSelector(
    selectStaffState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectStaffState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectStaffState,
    (state) => state.searchText
);

export const selectJobFilter = createSelector(
    selectStaffState,
    (state) => state.jobFilter
);

export const selectFilteredStaffs = createSelector(
    selectStaffEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectJobFilter,
    selectSearchText,
    (entities, sorting, ascending, jobs,  searchText) => {
        let arrayOfStaff = Object.values(entities!);

        if (searchText !== '')
            arrayOfStaff = arrayOfStaff.filter((staff: any) => staff.name.toLowerCase().includes(searchText.toLowerCase()));

        if (jobs.length > 0)
            arrayOfStaff = arrayOfStaff.filter((staff: any) => jobs.includes(staff.jobTitle));

        if (sorting === 'noCriteria')
            return arrayOfStaff;

        return arrayOfStaff.sort((a: any, b: any) => {
            if (ascending)
                return a[sorting] - b[sorting];
            else
                return b[sorting] - a[sorting];
        });
    }
);