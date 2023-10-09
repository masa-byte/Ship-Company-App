import { EntityState } from "@ngrx/entity";
import { CruiseShip } from "src/app/cruise-ship/cruise-ship.model";

export interface CruiseShipState extends EntityState<CruiseShip> {
    selectedCruiseShipId: number | null;
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    searchText: string;
}