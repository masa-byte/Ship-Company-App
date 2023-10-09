import { EntityState } from "@ngrx/entity";
import { Boat } from "src/app/boat/boat.model";

export interface BoatState extends EntityState<Boat> {
    selectedBoatId: number | null;
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    searchText: string;
}