import { EntityState } from "@ngrx/entity";
import { Renting } from "src/app/renting/renting.model";

export interface RentingState extends EntityState<Renting> {
    selectedRentingId: number | null;
    loading: boolean;
    error: string;
}