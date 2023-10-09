import { EntityState } from "@ngrx/entity";
import { Cruise } from "src/app/cruise/cruise.model";

export interface CruiseState extends EntityState<Cruise> {
    selectedCruiseId: number | null;
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    typeFiler: string[];
    searchText: string;
}