import { EntityState } from "@ngrx/entity";
import { Destination } from "src/app/destination/destination.model";

export interface DestinationState extends EntityState<Destination> {
    selectedDestinationId: number | null;
    loading: boolean;
    error: string;
}