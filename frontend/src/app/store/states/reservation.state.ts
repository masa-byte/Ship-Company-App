import { EntityState } from "@ngrx/entity";
import { Reservation } from "src/app/reservation/reservation.model";

export interface ReservationState extends EntityState<Reservation> {
    selectedReservationId: number | null;
    loading: boolean;
    error: string;
}