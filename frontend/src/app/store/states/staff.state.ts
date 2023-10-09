import { EntityState } from "@ngrx/entity";
import { Staff } from "src/app/staff/staff.model";

export interface StaffState extends EntityState<Staff> {
    selectedStaffId: number | null;
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    jobFilter: string[];
    searchText: string;
}